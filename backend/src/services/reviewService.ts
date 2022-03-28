import { Repository } from "typeorm"

import db from "../dataSource"
import { Review } from "../models/review"
import CarService from "./carService"
import UserService from "./userService"

export default class ReviewService {
    private repository: Repository<Review>

    constructor(private carService: CarService, private userService: UserService) {
        this.repository = db.getRepository(Review)
    }

    async newReview(body: any) {
        const car = await this.carService.getCar(body.carId)
        if (car === null) throw `Car does not exist: id=${body.carId}`

        const user = await this.userService.getUser(body.userId)
        if (user === null) throw `User does not exist: id=${body.carId}`

        return await this.repository.save(body)
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
        return await this.repository.find({
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
    }

    async getReviewCountAndAverageRating(carId: number) {
        return await this.repository
            .createQueryBuilder("R")
            .select("COUNT(*)", "review_count")
            .addSelect("AVG(R.rating)", "average_rating")
            .where("carId = :carId", { carId })
            .getRawOne()
    }
}
