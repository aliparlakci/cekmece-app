import { Router, Request, Response, RequestHandler } from "express"
import createError from "http-errors"
import Joi from "joi"

import CarService from "../services/carService"
import CategoryService from "../services/categoryService"

function getAllCars(carService: CarService) {
    return async function (req, res, next) {
        const cars = await carService.getAllCars()

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
        })
        const { error } = carFormat.validate(req.body)
        if (error) {
            next(createError(400))
            return
        }

        let id;
        try {
            id = await carService.insertCar(req.body)
        } catch (err) {
            next(createError(404))
            return
        }
        
        res.status(200).json(id)
    }
}

function carRouter() {
    const router = Router()

    const categoryService = new CategoryService();
    const carService = new CarService(categoryService)

    router.get("/", getAllCars(carService))
    router.post("/new", addNewCar(carService))

    return router
}

export default carRouter
