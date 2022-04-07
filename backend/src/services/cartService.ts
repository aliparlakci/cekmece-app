import { Console } from "console"
import { Repository } from "typeorm"

import db from "../dataSource"
import { Car } from "../models/car"
import { CartEntity } from "../models/cart"
import { Review, Ratings } from "../models/review"
import { User } from "../models/user"
import CarService from "./carService"
import UserService from "./userService"

export default class CartService {
    private cartRepo: Repository<CartEntity>
    private userRepo: Repository<User>
    private carRepo: Repository<Car>

    constructor( private userService: UserService,private carService: CarService) {
        this.cartRepo = db.getRepository(CartEntity)
        this.userRepo = db.getRepository(User)
        this.carRepo = db.getRepository(Car)

    }

    async addToCart(productId: number, quantity: number, user: string) {
        const cartItems = await this.cartRepo.find({ relations: ["item",'user'] });
        const product = await this.carService.getCar(productId);
        const authUser = await this.userService.getUser(user);
       
        //Confirm the product exists.

            if (product && authUser) {
                //confirm if user has item in cart
                const cart = cartItems.filter(
                    (item) => item.item.id === productId && item.user.id === user,
                );
                if (cart.length < 1) {
                    return ( await this.cartRepo.save({ total: product.price * quantity, quantity,user:authUser ?? new User(),item:product}));
                } else {
                    //Update the item quantity

                    const quantity = (cart[0].quantity += 1);
                    const total = cart[0].total * quantity;
                    cart[0].quantity = (cart[0].quantity += 1);
                    cart[0].total= cart[0].total * quantity;

                    await this.cartRepo.update(cart[0].id, { quantity, total })
     
                    return (cart[0]);
                }
            }

            return 404 
    }

    async getItemsInCard(user: string): Promise<CartEntity[]> {
        const userCart = await this.cartRepo.find({ relations: ["item",'user'] });
        return (await userCart).filter(item => item.user.id === user)
    }

}
