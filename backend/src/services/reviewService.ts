import { Repository } from "typeorm"

import db from "../dataSource"
import { Review, Ratings, ApprovalStatus } from "../models/review"
import { User } from "../models/user"
import CarService from "./carService"
import UserService from "./userService"
import OrderService from "./orderService"
import { OrderStatus } from "../models/order"

export default class ReviewService {
    private repository: () => Repository<Review>

    constructor(private carService: CarService, private userService: UserService, private orderService: OrderService) {
        this.repository = () => db.getRepository(Review)
    }

    async newReview(body: { carId: number; orderItemId: string; user: User; rating: number; comment?: string }) {
        const { carId, orderItemId, user, rating, comment } = body

        const car = await this.carService.getCar(carId)
        if (car === null) throw `Car with id ${carId} does not exist.`

        const orderItem = await this.orderService.getOrderItem(parseInt(orderItemId))
        if (orderItem === null) throw `Order item with id ${orderItemId} does not exist.`

        if (orderItem.car.id !== carId) {
            throw `Order item's car id ${orderItem.car.id} does not match with the provided car id ${carId}.`
        }

        if (orderItem.status !== OrderStatus.DELIVERED) {
            throw `Attempt to review a not yet delivered car.`
        }

        if (orderItem.review) {
            throw `Attempt to review an already reviewed order.`
        }

        const review = await this.repository().save({
            car,
            orderItem,
            comment: comment,
            approvalStatus: comment ? ApprovalStatus.IN_PROGRESS : ApprovalStatus.APPROVED,
            rating: rating as Ratings,
            user,
        })

        const { reviewCount, averageRating } = await this.getReviewCountAndAverageRating(carId)
        await this.carService.updateReviewCountAndAverage(carId, reviewCount, averageRating)

        return review
    }

    async getAllReviews() {
        return await this.repository().find()
    }

    async getReview(id: number) {
        return await this.repository().findOne({ where: { id }, relations: { car: true } })
    }

    async deleteReview(id: number, userId: string) {
        const carId = (await this.getReview(id))?.car.id

        const review = await this.repository().findOne({
            where: { id: id },
            relations: { user: true },
        })

        if (review === null) {
            const error = new Error(`Review with id ${id} does not exist.`)
            error.name = "ReviewError"
            throw error
        }

        if (review.user.id !== userId && review.user.role.toLowerCase() === "customer") {
            const error = new Error(`Unauthorized attempt to delete another user's review.`)
            error.name = "AuthError"
            throw error
        }

        const deleteResult = await this.repository()
            .createQueryBuilder()
            .delete()
            .from(Review)
            .where("id = :id", { id })
            .execute()

        if (carId) {
            const { reviewCount, averageRating } = await this.getReviewCountAndAverageRating(carId)
            await this.carService.updateReviewCountAndAverage(carId, reviewCount, averageRating)
        }

        return deleteResult
    }

    async getReviewsOfCar(carId: number) {
        const reviews: Review[] = await this.repository().find({
            relations: {
                user: true,
            },

            select: {
                user: {
                    id: true,
                },
            },

            where: {
                car: {
                    id: carId,
                },
            },
            order: {
                createdDate: "DESC",
            },
        })

        const reviewCount = reviews.length
        let averageRating = 0
        const reviewRatioByRating: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }

        reviews.map((review) => {
            reviewRatioByRating[review.rating] += 100 / reviewCount
            averageRating += review.rating / reviewCount

            if (review.approvalStatus === ApprovalStatus.IN_PROGRESS) {
                review.comment = "This comment is currently being reviewed by one of our moderators for approval."
                return review
            }

            return review
        })

        return {
            reviewCount,
            averageRating: averageRating.toFixed(1),
            reviewRatioByRating,
            reviews,
        }
    }

    async getReviewCountAndAverageRating(carId: number) {
        return await this.repository()
            .createQueryBuilder("R")
            .select("COUNT(*)", "reviewCount")
            .addSelect("AVG(R.rating)", "averageRating")
            .where("carId = :carId", { carId })
            .getRawOne()
    }

    async getAllUnapprovedReviews() {
        return await this.repository().find({
            relations: {
                user: true,
                car: true,
            },

            where: {
                approvalStatus: ApprovalStatus.IN_PROGRESS,
            },

            order: {
                createdDate: "ASC",
            },
        })
    }

    async updateApprovalStatus(id: number, status: ApprovalStatus) {
        return await this.repository().update({id: id}, {approvalStatus: ApprovalStatus.APPROVED})
    }
}
