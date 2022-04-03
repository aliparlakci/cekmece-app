import { Repository } from "typeorm"

import db from "../dataSource"
import { Car } from "../models/car"
import CategoryService from "./categoryService"
import { Review } from "../models/review"

export default class CarService {
    private repository: Repository<Car>

    constructor(private categoryService: CategoryService) {
        this.repository = db.getRepository(Car)
    }

    async insertCar(candidate: Car) {
        return await this.repository.save(candidate)
    }

    async getCar(carId: number) {
        return this.repository.findOne({
            where: { id: carId },
            relations: {
                distributor: true,
                categories: true,
            },
        })
    }

    async getAllCars() {
        return this.repository.find({
            relations: {
                categories: true,
                distributor: true,
            },
        })
    }

    async getCarsByCategory(categoryId: number) {
        const category = await this.categoryService.getCategory(categoryId)
        if (category === null) throw `Category does not exists: id=${categoryId}`

        return this.repository.find({
            join: { alias: "categories" },
            where: {
                categories: category,
            },
        })
    }

    async assignCategory(categoryId: number, carId: number) {
        const category = await this.categoryService.getCategory(categoryId)
        if (category === null) throw `Category does not exists: id=${categoryId}`

        const car = await this.getCar(carId)
        if (car === null) throw `Car does not exists: id=${carId}`

        this.repository.createQueryBuilder().relation(Car, "categories").of(car).add(category)
    }

    async removeCategory(categoryId: number, carId: number) {
        const category = await this.categoryService.getCategory(categoryId)
        if (category === null) throw `Category does not exists: id=${categoryId}`

        const car = await this.getCar(carId)
        if (car === null) throw `Car does not exists: id=${carId}`

        this.repository.createQueryBuilder().relation(Car, "categories").of(car).remove(categoryId)
    }

    async searchCars(query:string) {
   
        return this.repository.createQueryBuilder().select()
          .where(`MATCH(name) AGAINST ('${query}' IN BOOLEAN MODE)`)
          .orWhere(`MATCH(distributer) AGAINST ('${query}' IN BOOLEAN MODE)`)
          .getMany();
    }
}

