import { FindOptionsWhere, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from "typeorm"

import db from "../dataSource"
import { Car } from "../models/car"
import CategoryService from "./categoryService"

export interface FilterOptions {
    q?: string
    sort?: "priceHigh" | "priceLow" | "mostPopular" | "leastPopular"
    minPrice?: string
    maxPrice?: string
    minYear?: string
    maxYear?: string
    distributor?: string
    category?: string
}

export default class CarService {
    private repository: () => Repository<Car>

    constructor(private categoryService: CategoryService) {
        this.repository = () => db.getRepository(Car)
    }

    async insertCar(candidate: Car) {
        return await this.repository().save(candidate)
    }

    async getCar(carId: number) {
        return this.repository().findOne({
            where: { id: carId },
            relations: {
                distributor: true,
                category: true,
            },
        })
    }

    async filterCars(options: FilterOptions) {
        let query = this.repository().createQueryBuilder("cars").where("1 = 1")
        const where: FindOptionsWhere<Car> = {}

        if (options.minPrice) {
            query = query.andWhere("cars.price >= :minPrice", { minPrice: options.minPrice })
        }

        if (options.maxPrice) {
            query = query.andWhere("cars.price <= :minPrice", { maxPrice: options.maxPrice })
        }

        if (options.minYear) {
            query = query.andWhere("cars.model >= :minYear", { minYear: options.minYear })
        }

        if (options.maxYear) {
            query = query.andWhere("cars.model <= :maxYear", { maxYear: options.maxYear })
        }

        if (options.distributor) {
            query = query.andWhere("cars.distributor = :distributor", { distributor: options.distributor })
        }

        if (options.category) {
            query = query.andWhere("cars.category = :category", { category: options.category })
        }

        if (options.sort) {
            if (options.sort === "priceLow") {
                query = query.orderBy({
                    price: "ASC"
                })
            } else if (options.sort === "priceHigh") {
                query = query.orderBy({
                    price: "DESC"
                })
            }
        }

        if (options.q) {
            query = query.andWhere(`MATCH(cars.name) AGAINST ('${options.q}' IN NATURAL LANGUAGE MODE)`)
        }

        query = query.leftJoinAndSelect("cars.category", "category")
        query = query.leftJoinAndSelect("cars.distributor", "distributor")

        return query.getMany()
    }

    async getAllCars(sortBy: string) {
        return this.repository().find({
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

        return this.repository().find({
            where: {
                category: {
                    id: categoryId
                },
            },
        })
    }

    async assignCategory(categoryId: number, carId: number) {
        const category = await this.categoryService.getCategory(categoryId)
        if (category === null) throw `Category does not exists: id=${categoryId}`

        const car = await this.getCar(carId)
        if (car === null) throw `Car does not exists: id=${carId}`

        this.repository().createQueryBuilder().relation(Car, "categories").of(car).add(category)
    }

    async removeCategory(categoryId: number, carId: number) {
        const category = await this.categoryService.getCategory(categoryId)
        if (category === null) throw `Category does not exists: id=${categoryId}`

        const car = await this.getCar(carId)
        if (car === null) throw `Car does not exists: id=${carId}`

        this.repository().createQueryBuilder().relation(Car, "categories").of(car).remove(categoryId)
    }

    async searchCars(query: string) {
        return this.repository().createQueryBuilder().select()
          .where(`MATCH(name) AGAINST ('${query}' IN NATURAL LANGUAGE MODE)`)
          .getMany();
    }

    async deleteCar(id: number) {
        return this.repository().createQueryBuilder()
            .delete()
            .from(Car)
            .where("id = :id", { id })
            .execute()
    }
}

