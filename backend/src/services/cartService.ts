import { Console } from "console"
import { Repository } from "typeorm"

import db from "../dataSource"
import { Car } from "../models/car"
import { Cart } from "../models/cart"
import { Review, Ratings } from "../models/review"
import { User } from "../models/user"
import CarService from "./carService"
import UserService from "./userService"

export default class CartService {
    private repository: Repository<Cart>
    private userRepo: Repository<User>
    private carRepo: Repository<Car>

    constructor( private userService: UserService,private carService: CarService) {
        this.repository = db.getRepository(Cart)
        this.userRepo = db.getRepository(User)
        this.carRepo = db.getRepository(Car)

    }

    async getCartByID(id: number) {
        const cart = await this.carRepo.createQueryBuilder('car')
        .leftJoinAndSelect('car.carts', 'cart')
        .where('cart.id=:cart_id')
        .setParameter('cart_id', id)
        .getOne()
        console.log(cart)
        return await this.repository.findOne({ where: { id } })
    }

    async addItemToCart(body: { userId: string; carId:number}) {
        const { userId, carId} = body

        const car = await this.carService.getCar(carId)
        if (car === null) throw `Car does not exist: id=${carId}`

        const user = await this.userRepo.createQueryBuilder('user')
        .leftJoinAndSelect('user.cart', 'cart')
        .leftJoinAndSelect('cart.products', 'car')
        .where('user.id=:user_id')
        .setParameter('user_id', userId)
        .getOne()
        if (user === null) throw `User does not exist: id=${userId}`

        console.log(user)
        console.log(user.cart.products)

        user.cart.products.push(car);

        return (await this.repository.save(user.cart)).id;
        

        /*

         if (user.cart === undefined){
            // create a new cart
            console.log("heree")
            const newCart = new Cart()

            newCart.products = [car],
            newCart.user = user;
            return (await this.repository.save(newCart)).id;
        }
        else{
            console.log("h312312eree")

            const cart = await this.getCartByID(user.cart.id)
            if (cart === null) throw `User cart does not exist: id=${userId}`

            cart.products = [...cart.products,car]

            return (await this.repository.save(cart)).id;
        }
user.cart.products = [...user.cart.products, car]
        return (await this.userRepo.save(user)).cart
        */

    }

}
