import { Repository } from "typeorm"

import db from "../dataSource"
import { Car } from "../models/car"
import CategoryService from "./categoryService"

export default class CarService {
    private repository: Repository<Car>

    constructor(private categoryService: CategoryService) {
        this.repository = db.getRepository(Car)
    }

    async insertCar(candidate: Car) {
        const car = await this.repository.save(candidate)
        return car.id
    }

    async getCar(carId: number) {
        return this.repository.findOne({ where: { id: carId } })
    }

    async getAllCars() {
        return this.repository.find({
            relations: {
                categories: true,
            },
        })
    }

    async getCarsByCategory(categoryId: number) {
        const category = await this.categoryService.getCategory(categoryId)
        if (category === null)
            throw `Category does not exists: id=${categoryId}`

        return this.repository.find({
            join: { alias: "categories" },
            where: {
                categories: category,
            },
        })
    }

    async assignCategory(categoryId: number, carId: number) {
        this.repository.createQueryBuilder().relation(Car, "categories").add(categoryId)

        const category = await this.categoryService.getCategory(categoryId)
        if (category === null)
            throw `Category does not exists: id=${categoryId}`

        const car = await this.getCar(carId)
        if (car === null) throw `Car does not exists: id=${carId}`

        const filtered = car.categories.filter((item) => item.id !== categoryId)

        car.categories = [...filtered, category]
        
        this.repository.save(category)
    }
}
