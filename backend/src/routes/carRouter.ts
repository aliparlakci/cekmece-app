import { Router, RequestHandler } from "express"
import createError from "http-errors"
import { StatusCodes } from "http-status-codes"
import Joi from "joi"

import CarService, { FilterOptions } from "../services/carService"
import CategoryService from "../services/categoryService"
import ReviewService from "../services/reviewService"
import UserService from "../services/userService"

function getAllCars(carService: CarService): RequestHandler {
    return async function (req, res, next) {
        const cars = await carService.filterCars({
            category: req.query.category as string,
            distributor: req.query.distributor as string,
            sort: req.query.sort as "priceHigh" | "priceLow" | "mostPopular" | "leastPopular" | undefined,
            minPrice: req.query.minPrice as string,
            maxPrice: req.query.maxPrice as string,
            minYear: req.query.minYear as string,
            maxYear: req.query.maxYear as string
        })

        res.status(200).json(cars)
    }
}

function getCar(carService: CarService, reviewService: ReviewService) {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)
        const car = await carService.getCar(carId)

        if (car) {
            const { review_count, average_rating } = await reviewService.getReviewCountAndAverageRating(carId)
            res.status(200).json({ ...car, review_count, average_rating })
        } else {
            res.status(200).json({})
        }
    }
}

function addNewCar(carService: CarService): RequestHandler {
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

function updateNewCar(carService: CarService): RequestHandler {
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
            category: Joi.number().required()
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

function getReviews(reviewService: ReviewService): RequestHandler {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)
        const reviews = await reviewService.getReviewsOfCar(carId)

        res.status(200).json(reviews)
    }
}

function addNewReview(reviewService: ReviewService): RequestHandler {
    return async function (req, res, next) {
        const carId = parseInt(req.params.carId)
        const userId = "1"

        console.log(req.body)

        const reviewFormat = Joi.object().keys({
            rating: Joi.number().valid(1, 2, 3, 4, 5).required(),
            comment: Joi.string().min(3).max(1000).optional(),
        })

        const { error } = reviewFormat.validate(req.body)
        if (error) {
            next(createError(400))
            return
        }
        let review
        try {
            review = await reviewService.newReview({
                carId,
                userId,
                rating: req.body.rating,
                comment: req.body.comment,
            })
        } catch (err) {
            next(createError(404))
            return
        }

        res.status(StatusCodes.CREATED).json(review)
    }
}

function searchCar(carService: CarService): RequestHandler {
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

function deleteReview(reviewService: ReviewService): RequestHandler {
    return async function (req, res, next) {
        const reviewId = parseInt(req.params.reviewId)
        const result = await reviewService.deleteReview(reviewId)

        if (!result.affected || result.affected === 0) {
            res.status(StatusCodes.BAD_REQUEST).json({ Result: "Error" })
            return
        }

        res.status(StatusCodes.OK).json({ Result: "Success" })
    }
}

function getCarsByCategory(carService: CarService) {
    return async function (req, res, next) {
        const categoryId = parseInt(req.params.categoryId)

        const cars = await carService.getCarsByCategory(categoryId)

        res.status(200).json(cars)
    }
}

function deleteCar(carService: CarService): RequestHandler {
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
    const reviewService = new ReviewService(carService, userService)

    router.get("/", getAllCars(carService))
    router.get("/search", searchCar(carService))
    router.get("/:carId", getCar(carService, reviewService))
    router.post("/new", addNewCar(carService))
    router.post("/update", updateNewCar(carService))
    router.post("/:carId/delete", deleteCar(carService))
    router.post("/:carId/category/:categoryId", assignNewCategory(carService))
    router.delete("/:carId/category/:categoryId", removeCategory(carService))
    router.get("/category/:categoryId", getCarsByCategory(carService))

    /* CODE REVIEW */
    router.get("/:carId/reviews", getReviews(reviewService))
    router.post("/:carId/reviews/new", addNewReview(reviewService))
    router.delete("/:carId/reviews/:reviewId", deleteReview(reviewService))

    return router
}

export default carRouter
