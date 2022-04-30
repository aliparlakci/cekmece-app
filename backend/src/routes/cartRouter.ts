import { Router } from "express"
import { Category } from "../models/category"
import CarService from "../services/carService"
import CartService from "../services/cartService"
import CategoryService from "../services/categoryService"
import UserService from "../services/userService"

function getCart(userService: UserService, cartService: CartService) {
    return async function (req, res, next) {
        const userId = (req.params.userId)
        const cart =  await cartService.getItemsInCard(userId);

        if (cart) {
            res.status(200).json({ user:userId,cart })
        } else {
            res.status(404).json({})
        }
    }
}


function addToCart(userService: UserService, cartService: CartService) {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)
        const userId = (req.params.userId)
        
        const cartItem = await cartService.addToCart(carId,1, userId);

        if (cartItem === 404) {
            res.status(404).json({ cartItem:{},message:"An error happened" })
        } else {
            res.status(200).json({cartItem,message:"Success"})
        }
    
    }
}


function removeFromCart(userService: UserService, cartService: CartService) {
    return async function (req, res, next) {
        const cartEntityId = req.params.cartEntityId
        console.log(cartEntityId)


        const removeResult = await cartService.removeFromCart(cartEntityId);

        if(removeResult.affected !== 0){
            res.status(200).json({message:"Success"})
        }
        else{
            res.status(404).json({message:"Error"})
        }
    
    }
}

function decreaseItemQuantity(userService: UserService, cartService: CartService) {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)
        const userId = (req.params.userId)
        
        const cartItem = await cartService.decreaseItemQuantity(carId,1, userId);

        if (cartItem === 404) {
            res.status(404).json({ cartItem:{},message:"Wrong parameters" })
        } else {
            res.status(200).json({cartItem,message:"Success"})
        }
    
    }
}

function cartRouter() {
    const router = Router()

    const userService = new UserService()
    const categoryService = new CategoryService()
    const carService = new CarService(categoryService)
    const cartService = new CartService(userService,carService)

    router.get("/:userId", getCart(userService,cartService ))
    router.post("/:userId/add/:carId", addToCart(userService,cartService ))
    router.post("/:userId/remove/:carId", decreaseItemQuantity(userService,cartService ))
    router.post("/remove/:cartEntityId", removeFromCart(userService,cartService ))




    return router
}

export default cartRouter
