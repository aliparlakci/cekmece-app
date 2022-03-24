import { Router, RequestHandler } from "express"
import createError from "http-errors"
import { StatusCodes } from "http-status-codes"
import Joi from "joi"

import CarService from "../services/carService"
import CategoryService from "../services/categoryService"

function getAllCars(carService: CarService) {
    return async function (req, res, next) {
        const cars = await carService.getAllCars()

        res.status(200).json(cars)
    }
}

function getCar(carService: CarService) {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)
        const cars = await carService.getCar(carId)

        res.status(200).json(cars)
    }
}

function addNewCar(carService: CarService): RequestHandler {
    return async function (req, res, next) {
        const carFormat = Joi.object().keys({
            name: Joi.string().required(),
            model: Joi.number().less(2022).greater(1900).required(),
            number: Joi.number().positive().required(),
            quantity: Joi.number().greater(-1).required(),
            price: Joi.number().positive().required(),
            warranty: Joi.number().positive().required(),
            distributor: Joi.number().required(),
        })
        const { error } = carFormat.validate(req.body)
        if (error) {
            next(createError(400))
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

function updateNewCar(carService: CarService): RequestHandler {
    return async function (req, res, next) {
        const carFormat = Joi.object().keys({
            id: Joi.number().positive().required(),
            name: Joi.string().required(),
            model: Joi.number().less(2022).greater(1900).required(),
            number: Joi.number().positive().required(),
            quantity: Joi.number().greater(-1).required(),
            price: Joi.number().positive().required(),
            warranty: Joi.number().positive().required(),
            distributor: Joi.number().required(),
        })
        const { error } = carFormat.validate(req.body)
        if (error) {
            next(createError(400))
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

function assignNewCategory(carService: CarService): RequestHandler {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)
        const categoryId = parseInt(req.params.categoryId)
        
        carService.assignCategory(categoryId, carId)
        res.status(StatusCodes.OK).json()
    }
}

function removeCategory(carService: CarService): RequestHandler {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)
        const categoryId = parseInt(req.params.categoryId)
        
        carService.removeCategory(categoryId, carId)
        res.status(StatusCodes.OK).json()
    }
}

function carRouter() {
    const router = Router()

    const categoryService = new CategoryService()
    const carService = new CarService(categoryService)

    router.get("/", getAllCars(carService))
    router.get("/:carId", getCar(carService))
    router.post("/new", addNewCar(carService))
    router.post("/update", updateNewCar(carService))
    router.post("/:carId/category/:categoryId", assignNewCategory(carService))
    router.delete("/:carId/category/:categoryId", removeCategory(carService))

    return router
}

export default carRouter
