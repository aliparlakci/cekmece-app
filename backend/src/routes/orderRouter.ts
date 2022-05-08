import { Router, RequestHandler } from "express"
import createError from "http-errors"
import { StatusCodes } from "http-status-codes"
import Joi from "joi"

import CarService from "../services/carService"
import CategoryService from "../services/categoryService"
import UserService from "../services/userService"
import CartService from "../services/cartService"
import OrderService from "../services/orderService"
import { Order, OrderStatus, ShippingOption } from "../models/order"
import Context from "../utils/context"

function getOrders(orderService: OrderService) {
    return async function (req, res, next) {
        const ctx: Context | null = Context.get(req)
        if (ctx === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You must be logged in to get the list of orders.",
            })
            return
        }

        const user = ctx.user
        if (user === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You must be logged in to get the list of orders.",
            })
            return
        }

        const orders = await orderService.getOrdersByUser(user.id)
        res.status(StatusCodes.OK).json(orders)
    }
}

function addNewOrder(orderService: OrderService) {
    return async function (req, res, next) {
        const ctx: Context | null = Context.get(req)
        if (ctx === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You must be logged in to be able to order.",
            })
            return
        }

        const user = ctx.user
        if (user === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You must be logged in to be able to order.",
            })
            return
        }

        const { shippingOption, promoCode, addressLine1, addressLine2, city, province, zipCode, country } = req.body

        const orderFormat = Joi.object().keys({
            shippingOption: Joi.string()
                .valid(...Object.values(ShippingOption))
                .optional(),
            promoCode: Joi.string().max(50).optional(),
            addressLine1: Joi.string().max(50).required(),
            addressLine2: Joi.string().max(50).optional(),
            city: Joi.string().max(50).required(),
            province: Joi.string().max(50).optional(),
            zipCode: Joi.number().required(),
            country: Joi.string().max(50).required(),
        })
        const { error } = orderFormat.validate(req.body)
        if (error) {
            return next(createError(400, error))
        }

        let order
        try {
            order = await orderService.newOrder({
                shippingOption,
                promoCode,
                addressLine1,
                addressLine2,
                city,
                province,
                zipCode,
                country,
                user,
            } as Order)
        } catch (err) {
            if (err instanceof Error) {
                if (err.name === "CartError") {
                    return next(createError(400, err))
                } else if (err.name === "StockError") {
                    return next(createError(422, err))
                } else {
                    return next(createError(404, err))
                }
            }

            return next(createError(404, err))
        }

        res.status(200).json({
            message: "success",
        })
    }
}

function updateOrderStatus(orderService: OrderService) {
    return async function (req, res, next) {
        const orderId = parseInt(req.params.orderId)
        const { status } = req.body

        const orderStatusFormat = Joi.object()
            .keys({
                status: Joi.string()
                    .valid(...Object.values(OrderStatus))
                    .required(),
            })
            .required()

        const { error } = orderStatusFormat.validate(req.body)

        if (error) {
            return next(createError(400, error))
        }

        try {
            await orderService.changeOrderStatus(orderId, status)
            res.status(200).json({
                message: "success",
            })
        } catch (err) {
            return next(createError(404, err))
        }
    }
}

function getUnreviewedOrderItems(orderService: OrderService) {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)

        const ctx: Context | null = Context.get(req)
        if (ctx === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You must be logged in to get the list of unreviewed order items.",
            })
            return
        }

        const user = ctx.user
        if (user === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You must be logged in to get the list of unreviewed order items.",
            })
            return
        }

        const orders = await orderService.getUnreviewedOrderItems(user.id, carId)
        res.status(StatusCodes.OK).json(orders)
    }
}

function orderRouter() {
    const router = Router()
    const userService = new UserService()
    const categoryService = new CategoryService()
    const carService = new CarService(categoryService)
    const cartService = new CartService(userService, carService)
    const orderService = new OrderService(carService, cartService)

    router.get("/", getOrders(orderService))
    router.post("/new", addNewOrder(orderService))
    router.patch("/:orderId", updateOrderStatus(orderService))
    router.get("/unreviewed/:carId", getUnreviewedOrderItems(orderService))

    return router
}

export default orderRouter