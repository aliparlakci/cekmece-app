import { RequestHandler, Router } from "express"
import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import createError from "http-errors"

import CarService from "../services/carService"
import CartService from "../services/cartService"
import CategoryService from "../services/categoryService"
import UserService from "../services/userService"
import Context from "../utils/context"
import { Cart } from "../models/cart"

function getCart(userService: UserService, cartService: CartService) {
    return async function (req, res, next) {
        const userId = req.params.userId
        const cart = await cartService.getItemsInCard(userId)

        if (cart) {
            res.status(200).json({ user: userId, cart })
        } else {
            res.status(404).json({})
        }
    }
}

function addToCart(userService: UserService, cartService: CartService) {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)
        const userId = req.params.userId

        const ctx: Context | null = Context.get(req)
        if (ctx === null) {
            res.status(StatusCodes.NOT_FOUND).json()
            return
        }

        const user = ctx.user
        if (user === null) {
            res.status(StatusCodes.NOT_FOUND).json()
            return
        }

        if (user.id !== userId) {
            res.status(StatusCodes.UNAUTHORIZED).json({})
            return
        }

        const cartItem = await cartService.addToCart(carId, 1, user)

        if (cartItem === 404) {
            res.status(404).json({ cartItem: {}, message: "An error happened" })
        } else {
            res.status(200).json({ cartItem, message: "Success" })
        }
    }
}

function removeFromCart(userService: UserService, cartService: CartService) {
    return async function (req, res, next) {
        const cartEntityId = req.params.cartEntityId

        const removeResult = await cartService.removeFromCart(cartEntityId)

        if (removeResult.affected !== 0) {
            res.status(200).json({ message: "Success" })
        } else {
            res.status(404).json({ message: "Error" })
        }
    }
}

function deleteCart(userService: UserService, cartService: CartService) {
    return async function (req, res, next) {
        const userId = req.params.userId
        const removeResult = await cartService.deleteUserCart(userId)

        const ctx: Context | null = Context.get(req)
        if (ctx === null) {
            res.status(StatusCodes.NOT_FOUND).json()
            return
        }

        const user = ctx.user
        if (user === null) {
            res.status(StatusCodes.NOT_FOUND).json()
            return
        }

        if (userId !== user.id) {
            res.status(StatusCodes.UNAUTHORIZED).json({})
            return
        }

        if (removeResult.affected !== 0) {
            res.status(200).json({ message: "Success" })
        } else {
            res.status(404).json({ message: "Error - User cart might be empty already!" })
        }
    }
}

function decreaseItemQuantity(userService: UserService, cartService: CartService) {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)
        const userId = req.params.userId

        const cartItem = await cartService.decreaseItemQuantity(carId, 1, userId)

        if (cartItem === 404) {
            res.status(404).json({ cartItem: {}, message: "Wrong parameters" })
        } else {
            res.status(200).json({ cartItem, message: "Success" })
        }
    }
}

function replaceCart(cartService: CartService): RequestHandler {
    return async function (req, res, next) {
        const ctx: Context | null = Context.get(req)
        if (ctx === null) {
            res.status(StatusCodes.NOT_FOUND).json()
            return
        }

        const user = ctx.user
        if (user === null) {
            res.status(StatusCodes.NOT_FOUND).json()
            return
        }

        const cartFormat = Joi.object().keys({
            items: Joi.array()
                .items(
                    Joi.object().keys({
                        id: Joi.number(),
                        amount: Joi.number(),
                    })
                )
                .required(),
        })
        const { error } = cartFormat.validate(req.body)
        if (error) {
            return next(createError(400, error))
        }

        try {
            await cartService.replaceCart(req.body.items, user)
        } catch (e) {
            return next(createError(400, e))
        }

        res.status(201).json({})
    }
}

function cartRouter() {
    const router = Router()

    const userService = new UserService()
    const categoryService = new CategoryService()
    const carService = new CarService(categoryService)
    const cartService = new CartService(userService, carService)

    router.get("/:userId", getCart(userService, cartService))
    router.post("/replace", replaceCart(cartService))
    router.post("/:userId/add/:carId", addToCart(userService, cartService))
    router.post("/:userId/remove/:carId", decreaseItemQuantity(userService, cartService))
    router.post("/remove/:cartEntityId", removeFromCart(userService, cartService))

    return router
}

export default cartRouter
