import { Router, RequestHandler } from "express"
import createError from "http-errors"
import { StatusCodes } from "http-status-codes"
import Joi from "joi"

import CarService, { FilterOptions } from "../services/carService"
import CategoryService from "../services/categoryService"
import ReviewService from "../services/reviewService"
import UserService from "../services/userService"
import Context from "../utils/context"
import CartService from "../services/cartService"
import OrderService from "../services/orderService"
import reviewRouter from "./reviewRouter"
import InvoiceService from "../services/invoiceService"

export function getAllCars(carService: CarService): RequestHandler {
    return async function (req, res, next) {
        const cars = await carService.filterCars({
            category: req.query.category as string,
            distributor: req.query.distributor as string,
            sort: req.query.sort as "priceHigh" | "priceLow" | "mostPopular" | "leastPopular" | undefined,
            minPrice: req.query.minPrice as string,
            maxPrice: req.query.maxPrice as string,
            minYear: req.query.minYear as string,
            maxYear: req.query.maxYear as string,
            q: req.query.q as string
        })
        res.status(200).json(cars)
    }
}

export function getCar(carService: CarService, orderService: OrderService) {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)
        const car = await carService.getCar(carId)
        const ctx: Context | null = Context.get(req)
        if (ctx !== null && ctx.user !== null) {
            const userCanReviewCar = await orderService.checkUserCanReviewCar(ctx.user.id, carId)
            if (car) {
                res.status(200).json({ ...car, userCanReviewCar })
            } else {
                res.status(404).json({})
            }
        } else {
            res.status(200).json(car)
        }
    }
}

export function setDiscount(carService: CarService) {
    return async function (req, res, next) {
/*
        const ctx: Context | null = Context.get(req)
        if (ctx === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You must be logged in and be a product manager or an admin to be able to set discount.",
            })
            return
        }

        const user = ctx.user
        if (user === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You must be logged in and be a product manager or an admin to be able to set discount.",
            })
            return
        }
*/

        const carId = parseInt(req.params.carId)
        const discount = parseInt(req.params.amount)

        try{
            let car = await carService.setDiscount(carId,discount);
            res.status(StatusCodes.OK).json(car);
            return
        }
        catch(err){
            res.status(500).json(err)
            return
        }
    }
}

export function setPrice(carService: CarService) {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)
        const price = parseInt(req.params.amount)

        try{
            await carService.setPrice(carId,price);
            res.status(StatusCodes.OK);
            return
        }
        catch(err){
            res.status(500).json(err)
            return
        }
    }
}

export function addNewCar(carService: CarService): RequestHandler {
    return async function (req, res, next) {
        const carFormat = Joi.object().keys({
            name: Joi.string().required(),
            model: Joi.number().less(2023).greater(1900).required(),
            number: Joi.number().positive().required(),
            quantity: Joi.number().greater(-1).required(),
            price: Joi.number().positive().required(),
            warranty: Joi.number().positive().required(),
            distributor: Joi.number().required(),
            category: Joi.number().required(),
            description: Joi.string().optional(),
            photoUrl: Joi.string().optional(),
            discount: Joi.number().positive().optional()
        })
        const { error } = carFormat.validate(req.body)
        if (error) {
            res.status(400).json(error)
            return
        }

        let car
        try {
            car = await carService.insertCar(req.body)
        } catch (error) {
            res.status(500).json(error)
            return
        }

        res.status(StatusCodes.CREATED).json(car)
    }
}

export function updateNewCar(carService: CarService): RequestHandler {
    return async function (req, res, next) {
        const carFormat = Joi.object().keys({
            id: Joi.number().positive().required(),
            name: Joi.string().required(),
            model: Joi.number().less(2023).greater(1900).required(),
            number: Joi.number().positive().required(),
            quantity: Joi.number().greater(-1).required(),
            price: Joi.number().positive().required(),
            warranty: Joi.number().positive().required(),
            distributor: Joi.number().required(),
            category: Joi.number().required(),
            description: Joi.string().optional(),
            photoUrl: Joi.string().optional(),
            discount: Joi.number().positive().optional()
        })
        const { error } = carFormat.validate(req.body)
        if (error) {
            res.status(400).json(error)
            return
        }

        let car
        try {
            car = await carService.insertCar(req.body)
        } catch (err) {
            next(createError(404))
            return
        }

        res.status(200).json(car)
    }
}

export function assignNewCategory(carService: CarService): RequestHandler {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)
        const categoryId = parseInt(req.params.categoryId)

        carService.assignCategory(categoryId, carId)
        res.status(StatusCodes.OK).json()
    }
}

export function removeCategory(carService: CarService): RequestHandler {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)
        const categoryId = parseInt(req.params.categoryId)

        carService.removeCategory(categoryId, carId)
        res.status(StatusCodes.OK).json()
    }
}

export function searchCar(carService: CarService): RequestHandler {
    return async function (req, res, next) {
        const query = req.query.q || ""
        if (!query) {
            next(createError(400))
            return
        }

        try {
            const response = await carService.searchCars(query as string)
            res.status(StatusCodes.OK).json(response)
            return
        } catch (error) {
            res.status(500).json("error")
        }
    }
}

export function getCarsByCategory(carService: CarService) {
    return async function (req, res, next) {
        const categoryId = parseInt(req.params.categoryId)

        const cars = await carService.getCarsByCategory(categoryId)

        res.status(200).json(cars)
    }
}

export function deleteCar(carService: CarService): RequestHandler {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)
        if (isNaN(carId)) {
            res.status(StatusCodes.BAD_REQUEST).json("id invalid")
            return
        }

        const result = await carService.deleteCar(carId)
        if (result.affected === 0) {
            res.status(StatusCodes.BAD_REQUEST).json("Cannot delete the car")
            return
        }

        res.status(StatusCodes.OK).json()
    }
}

function carRouter() {
    const router = Router()

    // batu

    const categoryService = new CategoryService()
    const userService = new UserService()
    const carService = new CarService(categoryService)
    const cartService = new CartService(userService, carService)
    const invoiceService = new InvoiceService(userService)
    const orderService = new OrderService(carService, cartService, invoiceService)

    router.get("/", getAllCars(carService))
    router.get("/search", searchCar(carService))
    router.get("/:carId", getCar(carService, orderService))
    router.post("/new", addNewCar(carService))
    router.post("/update", updateNewCar(carService))
    router.post("/:carId/delete", deleteCar(carService))
    router.post("/:carId/category/:categoryId", assignNewCategory(carService))
    router.delete("/:carId/category/:categoryId", removeCategory(carService))
    router.get("/category/:categoryId", getCarsByCategory(carService))

    //discount routes
    router.post("/:carId/setDiscount/:amount", setDiscount(carService))
    router.post("/:carId/setPrice/:amount", setPrice(carService))


    router.use("/:carId/reviews", reviewRouter())

    return router
}

export default carRouter
