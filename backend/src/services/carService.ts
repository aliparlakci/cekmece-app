import { FindOptionsWhere, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from "typeorm"

import db from "../dataSource"
import { Car } from "../models/car"
import { WishlistItem } from "../models/wishlist"
import CategoryService from "./categoryService"
import WishlistService from "./wishlistService"
import CartService from "./cartService";
import {Cart} from "../models/cart";
var nodemailer = require("nodemailer")
var { google } = require("googleapis")

const CLIENT_ID = "80688403213-ev4ru35h4dff7pc7qdk2ic1637upjkpb.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//04_fGX48ChlHKCgYIARAAGAQSNgF-L9Ir6sVygmnMEE6P7CD_vRuiQKrG7PSs0HKxitDDL_axktynNZUqR6xbfis4LjgcbWcsOA"

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

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
    private cartRepo: () => Repository<Cart>

    constructor(private categoryService: CategoryService) {
        this.repository = () => db.getRepository(Car)
        this.wishlistRepo = () => db.getRepository(WishlistItem)
        this.cartRepo = () => db.getRepository(Cart)
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

    async setPrice(carId, price) {
        await this.repository().update({id: carId}, {price: price})
    }

    async setDiscount(carId: number, discount:number){
        if (discount < 0) throw "Discount amount can not be smaller than 0";

        const car = await this.getCar(carId);

        if (car === null) throw `Car does not exists: id=${carId}`

        //if (discount > car.price) throw `Discount can not be more than the price. Price:${car.price}, Discount:${discount}`

        if(car.discount !== null && discount > car.discount){
            try{
                // a bigger discount was made, send mail
                // get users who have this car in their wishlists
                let wishlist = await this.wishlistRepo().find({relations: ["item", "user"]})
                wishlist = (await wishlist).filter((wlItem) => wlItem.item.id === car!.id);
                // send mail
                let userMails = wishlist.map((item) => item.user.email);

                const accessToken = oAuth2Client.getAccessToken()
                const transport = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        type: "OAuth2",
                        user: "cs308myaraba@gmail.com",
                        clientId: CLIENT_ID,
                        clientSecret: CLIENT_SECRET,
                        refreshToken: REFRESH_TOKEN,
                        accessToken: accessToken,
                    },
                    tls: {
                        rejectUnauthorized: true,
                    },
                })

                userMails.forEach((email) => {
                    console.log(email);
                    const mailOptions = {
                        from: "CarWow <cs308myaraba@gmail.com>",
                        to: email,
                        subject: "A car in your wishlist is now on sale!",
                        text: `A car on your wishlist, ${car.model} model ${car.distributor.name} ${car.name} is now on sale on CarWow! The price was $${car.price * (100 - car.discount) / 100}, it's now $${car.price * (100 - discount) / 100}! Check it out!`,

                    }
                    transport.sendMail(mailOptions)
                })

            }
            catch(err){
                console.log(err);
            }
        }

        try {
            await this.applyDiscountToCartItem(car.id, car.price * (100 - discount) / 100)
        } catch (e) {
            console.error(e)
        }

        return this.repository().update({ id: car.id }, { discount });
    }

    async filterCars(options: FilterOptions) {
        let query = this.repository().createQueryBuilder("cars").where("1 = 1")
        const where: FindOptionsWhere<Car> = {}

        if (options.minPrice) {
            query = query.andWhere("(cars.price * (100 - cars.discount) / 100) >= :minPrice", { minPrice: options.minPrice })
        }

        if (options.maxPrice) {
            query = query.andWhere("(cars.price * (100 - cars.discount) / 100) <= :maxPrice", { maxPrice: options.maxPrice })
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

        query = query.andWhere("cars.isDeleted = :isDeleted", { isDeleted: false })

        query = query.leftJoinAndSelect("cars.category", "category")
        query = query.leftJoinAndSelect("cars.distributor", "distributor")

        const cars = await query.getMany()
        return cars.filter(car =>
            {
                let flag = !car.category.isDeleted
                if (options.q && options.q !== "") {
                    flag = flag && (car.name.toLowerCase().includes(options.q.toLowerCase()) || car.distributor.name.toLowerCase().includes(options.q.toLowerCase()) || car.description.toLowerCase().includes(options.q.toLowerCase()))
                }
                return flag
            }
        )
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
        return this.repository().update({ id: id }, { isDeleted: true })
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

    async applyDiscountToCartItem(carId: number, newUnitPrice: number) {
        const cartItems = await this.cartRepo().find({ where: { item: { id: carId } } } )
        const promises = cartItems.map(async item => {
            item.total = item.quantity * newUnitPrice
            return await this.cartRepo().save(item)
        })

        await Promise.all(promises)
    }
}
