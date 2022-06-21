import { Router, RequestHandler } from "express"
import createError from "http-errors"
import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import Context from "../utils/context"

import CarService from "../services/carService"
import CategoryService from "../services/categoryService"
import UserService from "../services/userService"
import ReviewService from "../services/reviewService"
import OrderService from "../services/orderService"
import CartService from "../services/cartService"
import { DeleteResult } from "typeorm"
import InvoiceService from "../services/invoiceService"
import { ApprovalStatus } from "../models/review"

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

        const ctx: Context | null = Context.get(req)
        if (ctx === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You must be logged in to leave a review.",
            })
            return
        }

        const user = ctx.user
        if (user === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You must be logged in to leave a review.",
            })
            return
        }

        const reviewFormat = Joi.object().keys({
            rating: Joi.number().valid(1, 2, 3, 4, 5).required(),
            comment: Joi.string().min(3).max(1000).optional(),
            orderItemId: Joi.string().required(),
        })

        const { error } = reviewFormat.validate(req.body)
        if (error) {
            next(createError(400, error))
            return
        }

        let review
        try {
            review = await reviewService.newReview({
                carId,
                user,
                rating: req.body.rating,
                comment: req.body.comment,
                orderItemId: req.body.orderItemId,
            })
        } catch (err) {
            return next(createError(404, err))
        }

        res.status(StatusCodes.CREATED).json({ message: "success" })
    }
}

function deleteReview(reviewService: ReviewService): RequestHandler {
    return async function (req, res, next) {
        const ctx: Context | null = Context.get(req)
        if (ctx === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You must be logged in to be able to delete reviews.",
            })
            return
        }

        const user = ctx.user
        if (user === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You must be logged in to be able to delete reviews.",
            })
            return
        }

        const reviewId = parseInt(req.params.reviewId)

        try {
            const result = await reviewService.deleteReview(reviewId, user.id)

            if (!result.affected || result.affected === 0) {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "error" })
                return
            }

            res.status(StatusCodes.OK).json({ message: "success" })
        } catch (err) {
            if (err instanceof Error) {
                if (err.name === "AuthError") {
                    return next(createError(401, err))
                } else {
                    return next(createError(404, err))
                }
            }

            return next(createError(404, err))
        }
    }
}

function updateApprovalStatus(reviewService: ReviewService) {
    return async function (req, res, next) {
        const reviewId = parseInt(req.params.reviewId)
        const { approvalStatus } = req.body

        const approvedStatusFormat = Joi.object()
            .keys({
                approvalStatus: Joi.string()
                    .valid(...Object.values(ApprovalStatus))
                    .required(),
            })
            .required()

        const { error } = approvedStatusFormat.validate(req.body)

        if (error) {
            return next(createError(400, error))
        }

        try {
            await reviewService.updateApprovalStatus(reviewId, approvalStatus)
            res.status(200).json({
                message: "success",
            })
        } catch (err) {
            return next(createError(404, err))
        }
    }
}

function reviewRouter() {
    const router = Router({ mergeParams: true })
    const categoryService = new CategoryService()
    const userService = new UserService()
    const carService = new CarService(categoryService)
    const cartService = new CartService(userService, carService)
    const invoiceService = new InvoiceService(userService)
    const orderService = new OrderService(carService, cartService, invoiceService)
    const reviewService = new ReviewService(carService, userService, orderService)

    router.get("/", getReviews(reviewService))
    router.post("/new", addNewReview(reviewService))
    router.delete("/:reviewId", deleteReview(reviewService))
    router.patch("/:reviewId", updateApprovalStatus(reviewService))

    return router
}

export default reviewRouter
