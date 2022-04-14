import { FindOptionsWhere, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from "typeorm"

import db from "../dataSource"
import { Car } from "../models/car"
import { Review } from "../models/review"
import CategoryService from "./categoryService"

export interface FilterOptions {
    price?: {
        value: number,
        type: "MORE" | "LESS"
    },
    model?: {
        value: number,
        type: "MORE" | "LESS"
    },
    sortBy: "ASC" | "DESC",
    category?: {
        value: number
    }
}

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
                category: true,
            },
        })
    }

    async filterCars(options: FilterOptions) {
        const where: FindOptionsWhere<Car> = {}

        if (options.price) {
            if (options.price.type == "LESS")
                where.price = LessThanOrEqual(options.price.value)
            else
                where.price = MoreThanOrEqual(options.price.value)
        }

        if (options.model) {
            if (options.model.type == "MORE")
                where.model = MoreThanOrEqual(options.model.value)
            else 
                where.model = LessThanOrEqual(options.model.value)
        }

        if (options.category) {


            where.category = {
                id: options.category.value
            }
        }

        return this.repository.find({
            relations: {
                category: true,
                distributor: true,
            },
            where: where,
            order: {
                price: {
                    direction: options.sortBy as "ASC" | "DESC" | "asc" | "desc" | undefined
                }
            }
        })
    }

    async getAllCars(sortBy: string) {
        return this.repository.find({
            relations: {
                category: true,
                distributor: true,
            },
            order: { // Sorts by the price, popularity should added.
                price: {
                    direction: sortBy as "ASC" | "DESC" | "asc" | "desc" | undefined
                }
            }
        })
    }

    async getCarsByCategory(categoryId: number) {
        const category = await this.categoryService.getCategory(categoryId)
        if (category === null) throw `Category does not exists: id=${categoryId}`

        return this.repository.find({
            join: { alias: "categories" },
            where: {
                category: category,
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

    async searchCars(query: string) {
        return this.repository.createQueryBuilder().select()
          .where(`MATCH(name) AGAINST ('${query}' IN NATURAL LANGUAGE MODE)`)
          .getMany();
    }

    async deleteCar(id: number) {
        return this.repository.createQueryBuilder()
            .delete()
            .from(Car)
            .where("id = :id", { id })
            .execute()
    }
}

