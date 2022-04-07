import { Router } from "express"
import { Category } from "../models/category"
import CarService from "../services/carService"
import CartService from "../services/cartService"
import CategoryService from "../services/categoryService"
import UserService from "../services/userService"

function getCart(userService: UserService, cartService: CartService) {
    return async function (req, res, next) {
        const cartId = parseInt(req.params.cartId)
        const cart = await cartService.getCartByID(cartId)

        if (cart) {
            res.status(200).json({ cart })
        } else {
            res.status(404).json({})
        }
    }
}

function addToCart(userService: UserService, cartService: CartService) {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)
        const userId = (req.params.userId)

        const cart = await cartService.addItemToCart({userId:userId,carId:carId})

        if (cart) {
            res.status(200).json({ cart })
        } else {
            res.status(404).json({})
        }
    }
}

function cartRouter() {
    const router = Router()

    const userService = new UserService()
    const categoryService = new CategoryService()
    const carService = new CarService(categoryService)
    const cartService = new CartService(userService,carService)

    router.get("/:cartId", getCart(userService,cartService ))
    router.post("/:userId/add/:carId", addToCart(userService,cartService ))


    return router
}

export default cartRouter
