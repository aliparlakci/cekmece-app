import { Router, Request, Response, RequestHandler } from "express"
import createError from "http-errors"
import { StatusCodes } from "http-status-codes"
import Joi from "joi"

import DistributorService from "../services/distributorService"

function addNewDistributor(distributorService: DistributorService): RequestHandler {
    return async function (req, res, next) {
        const distributorFormat = Joi.object().keys({
            name: Joi.string().required(),
        })
        const { error } = distributorFormat.validate(req.body)
        if (error) {
            next(createError(StatusCodes.BAD_REQUEST))
        }

        let id
        try {
            id = await distributorService.newDistributor(req.body)
        } catch (err) {
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR))
            return
        }

        res.status(StatusCodes.CREATED).json(id)
    }
}

function getCategories(distributorService: DistributorService): RequestHandler {
    return async function (req, res, next) {
        const categories = await distributorService.getAllCategories()

        res.status(StatusCodes.OK).json(categories)
    }
}

function deleteDistributor(distributorService: DistributorService): RequestHandler {
    return async function (req, res, next) {
        const distributorId = parseInt(req.params.distributorId)
        await distributorService.deleteDistributor(distributorId)
    }
}

function distributorRouter() {
    const router = Router()

    const distributorService = new DistributorService()

    router.get("/", getCategories(distributorService))
    router.post("/new", addNewDistributor(distributorService))
    router.post("/:distributorId/delete", deleteDistributor(distributorService))

    return router
}

export default distributorRouter
