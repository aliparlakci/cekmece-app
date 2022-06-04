import { FindOptionsWhere, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from "typeorm"

import db from "../dataSource"
import { Car } from "../models/car"
import { WishlistItem } from "../models/wishlist"
import CategoryService from "./categoryService"
import WishlistService from "./wishlistService"

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
    private wishlistRepo: () => Repository<WishlistItem>

    constructor(private categoryService: CategoryService) {
        this.repository = () => db.getRepository(Car)
        this.wishlistRepo = () => db.getRepository(WishlistItem)
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

    async setDiscount(carId: number, discount:number){
        let car = await this.getCar(carId);

        if (car === null) throw `Car does not exists: id=${carId}`

        if (discount > car.price) throw `Discount can not be more than the price. Price:${car.price}, Discount:${discount}`
        
        if(car.discount !== null && discount > car.discount){
            try{
                // a bigger discount was made, send mail
                // get users who have this car in their wishlists
                let wishlist = await this.wishlistRepo().find({relations: ["item", "user"]})
                wishlist = (await wishlist).filter((wlItem) => wlItem.item.id === car!.id);
                // send mail

                let userMails = wishlist.map((item) => item.user.email);

                console.log(userMails);
            }
            catch(err){console.log(err);}
        }

        car.discount = discount;

        return this.insertCar(car);
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
                    price: "ASC",
                })
            } else if (options.sort === "priceHigh") {
                query = query.orderBy({
                    price: "DESC",
                })
            } else if (options.sort === "mostPopular") {
                query = query.orderBy({
                    unitsSold: "DESC"
                })
            } else if (options.sort === "leastPopular") {
                query = query.orderBy({
                    unitsSold: "ASC"
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
            order: {
                // Sorts by the price, popularity should added.
                price: {
                    direction: sortBy as "ASC" | "DESC" | "asc" | "desc" | undefined,
                },
            },
        })
    }

    async getCarsByCategory(categoryId: number) {
        const category = await this.categoryService.getCategory(categoryId)
        if (category === null) throw `Category does not exists: id=${categoryId}`

        return this.repository().find({
            where: {
                category: {
                    id: categoryId,
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
        return this.repository()
            .createQueryBuilder()
            .select()
            .where(`MATCH(name) AGAINST ('${query}' IN NATURAL LANGUAGE MODE)`)
            .getMany()
    }

    async deleteCar(id: number) {
        return this.repository().createQueryBuilder().delete().from(Car).where("id = :id", { id }).execute()
    }

    async decreaseStock(carId: number, count: number) {
        const car = await this.repository().findOne({
            where: { id: carId },
        })
        if (car === null) throw `Car with id ${carId} does not exist.`
        if (car.quantity - count < 0) {
            const stockError = new Error(
                `There is not enough stock for Car with id ${carId}. Requested stock is ${count} while remaining stock is ${car.quantity}.`
            )
            stockError.name = "StockError"
            throw stockError
        } else {
            car.quantity = car.quantity - count
            car.unitsSold = car.unitsSold + count
            return await this.repository().save(car)
        }
    }
    async increaseStock(carId: number, count: number) {
        const car = await this.repository().findOne({
            where: { id: carId },
        })
        if (car === null) throw `Car with id ${carId} does not exist.`
        car.quantity = car.quantity + count
        return await this.repository().save(car)
    }
    async updateReviewCountAndAverage(carId: number, reviewCount: number, averageRating: number) {
        const car = await this.repository().findOne({
            where: { id: carId },
        })
        if (car === null) throw `Car with id ${carId} does not exist.`
        car.reviewCount = reviewCount
        car.averageRating = averageRating ? averageRating : 0
        return await this.repository().save(car)
    }
}
