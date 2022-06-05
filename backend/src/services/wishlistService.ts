import {Console} from "console"
import {Repository} from "typeorm"

import db from "../dataSource"
import {Car} from "../models/car"
import {Cart} from "../models/cart"
import {Review, Ratings} from "../models/review"
import {User} from "../models/user"
import {WishlistItem} from "../models/wishlist"
import CarService from "./carService"
import UserService from "./userService"

export default class WishlistService {
    private repository: () => Repository<WishlistItem>

    constructor(private userService: UserService, private carService: CarService) {
        this.repository = () => db.getRepository(WishlistItem)
    }

    async addToWishlist(productId: number, user: User) {
        if (!user) return 404
        const wishlist = await this.repository().find({
            relations: ["item", "user"],
            where: {
                item: {
                    id: productId
                },
                user: {
                    id: user.id
                }
            }
        })

        const product = await this.carService.getCar(productId)
        if (!product) return 404

        for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i].item.id == product.id) {
                return 200;
            }
        }

        return await this.repository().save({
            user,
            item: product,
        })
    }

    async addMultipleToWishlist(productIds: number[], user: User) {
        if (!user) throw `User is null`

        await Promise.all(productIds.map(async id => {
            const car = await this.carService.getCar(id)
            if (car) {
                await this.repository().save({user, item: car})
            }
        }))
    }

    async removeFromWishlist(wishlistEntityID: string) {
        return this.repository()
            .createQueryBuilder()
            .delete()
            .from(WishlistItem)
            .where("id = :id", {id: wishlistEntityID})
            .execute()
    }

    async getWishlist(user: string): Promise<WishlistItem[]> {
        const userWishlist = await this.repository().find({
            relations: {
                user: true,
                item: {
                    distributor: true,
                    category: true
                }
            }
        })
        return (await userWishlist).filter((item) => item.user.id === user)
    }


}
