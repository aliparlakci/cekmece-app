import { Repository } from "typeorm"

import db from "../dataSource"
import { Review, Ratings } from "../models/review"
import CarService from "./carService"
import UserService from "./userService"

export default class ReviewService {
    private repository: Repository<Review>

    constructor(private carService: CarService, private userService: UserService) {
        this.repository = db.getRepository(Review)
    }

    async newReview(body: { carId: number; userId: string; rating: number; comment?: string }) {
        const { carId, userId, rating, comment } = body

        const car = await this.carService.getCar(carId)
        if (car === null) throw `Car does not exist: id=${carId}`

        const user = await this.userService.getUser(userId)
        if (user === null) throw `User does not exist: id=${carId}`

        return (
            await this.repository.save({
                car,
                comment: comment,
                isApproved: comment ? false : true,
                rating: rating as Ratings,
                user,
            })
        ).id
    }

    async getAllReviews() {
        return await this.repository.find()
    }

    async getReview(id: number) {
        return await this.repository.findOne({ where: { id } })
    }

    async deleteReview(id: number) {
        return this.repository.createQueryBuilder().delete().from(Review).where("id = :id", { id }).execute()
    }

    async getReviewsOfCar(carId: number) {
        const reviews: Review[] = await this.repository.find({
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

        return reviews.map((review) => {
            if (review.isApproved === false) {
                review.comment = "This comment is currently being reviewed by one of our moderators for approval."
                return review
            }

            return review
        })
    }

    async getReviewCountAndAverageRating(carId: number) {
        return await this.repository
            .createQueryBuilder("R")
            .select("COUNT(*)", "review_count")
            .addSelect("AVG(R.rating)", "average_rating")
            .where("carId = :carId", { carId })
            .getRawOne()
    }

    async getAllUnapprovedReviews() {
        return await this.repository.find({
            relations: {
                user: true,
                car: true,
            },

            where: {
                isApproved: false,
            },

            order: {
                createdDate: "ASC",
            },
        })
    }
}
