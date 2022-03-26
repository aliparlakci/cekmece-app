import { Repository } from "typeorm"

import db from "../dataSource"
import { Review } from "../models/review"

export default class ReviewService {
    private repository: Repository<Review>

    constructor() {
        this.repository = db.getRepository(Review)
    }

    async newReview(candidate: Review) {
        return await this.repository.save(candidate)
    }

    async getAllReviews() {
        return this.repository.find()
    }

    async getReview(id: number) {
        return this.repository.findOne({ where: { id } })
    }

    async getReviewsByCar(carId: number) {
        return this.repository.find({
            relations: {
                car: true,
            },
            where: {
                car: {
                    id: carId,
                },
            },
        })
    }

    async deleteReview(id: number) {
        return this.repository.createQueryBuilder().delete().from(Review).where("id = :id", { id })
    }
}
