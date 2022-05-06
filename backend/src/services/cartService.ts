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
    private repository: () => Repository<Cart>

    constructor( private userService: UserService,private carService: CarService) {
        this.repository = () => db.getRepository(Cart)
    }

    async addToCart(productId: number, quantity: number, user: string) {
        const cartItems = await this.repository().find({ relations: ["item",'user'] });
        const product = await this.carService.getCar(productId);
        const authUser = await this.userService.getUser(user);
       
        //Confirm the product exists.
            if (product && authUser) {
                //confirm if user has item in cart
                const cart = cartItems.filter(
                    (item) => item.item.id === productId && item.user.id === user,
                );
                if (cart.length < 1) {
                    return ( await this.repository().save({ total: product.price * quantity, quantity,user:authUser ?? new User(),item:product}));
                } else {
                    //Update the item quantity

                    if(product.quantity < cart[0].quantity + 1){
                        return (cart[0]);
                    }

                    const quantity = (cart[0].quantity += 1);
                    const total = cart[0].total * quantity;

                    await this.repository().update(cart[0].id, { quantity, total })
     
                    return (cart[0]);
                }
            }

            return 404 
    }

    async removeFromCart(cartEntityId: string) {
        console.log(cartEntityId)
            return  this.repository().createQueryBuilder().delete().from(Cart).where("id = :id", { id:cartEntityId }).execute()
    }

    async deleteUserCart(userId: string) {
        console.log(userId)
            return  this.repository().createQueryBuilder().delete().from(Cart).where("user.id = :id", { id:userId }).execute()
    }

    async decreaseItemQuantity(productId: number, quantity: number, user: string) {
        const cartItems = await this.repository().find({ relations: ["item",'user'] });
        const product = await this.carService.getCar(productId);
        const authUser = await this.userService.getUser(user);
       
        //Confirm the product exists.

            if (product && authUser) {
                //confirm if user has item in cart
                const cart = cartItems.filter(
                    (item) => item.item.id === productId && item.user.id === user,
                );
                if (cart.length < 1) {
                    return 404;
                } else {
                    //Update the item quantity
                    if(cart[0].quantity === 1){
                        this.removeFromCart(cart[0].id.toString());
                        return "Removed From Cart";
                    }
                    const quantity = (cart[0].quantity -= 1);
                    const total = cart[0].total * quantity;

                    await this.repository().update(cart[0].id, { quantity, total })
     
                    return (cart[0]);
                }
            }

            return 404 
    }

    async getItemsInCard(user: string): Promise<Cart[]> {
        const userCart = await this.repository().find({ relations: ["item",'user'] });
        return (await userCart).filter(item => item.user.id === user)
    }

}
