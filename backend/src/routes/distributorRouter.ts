import {Router, Request, Response, RequestHandler} from "express"
import createError from "http-errors"
import {StatusCodes} from "http-status-codes"
import Joi from "joi"

import DistributorService from "../services/distributorService"

export function addNewDistributor(distributorService: DistributorService): RequestHandler {
    return async function (req, res, next) {
        const distributorFormat = Joi.object().keys({
            name: Joi.string().required(),
        })
        const {error} = distributorFormat.validate(req.body)
        if (error) {
            res.status(StatusCodes.BAD_REQUEST).json({})
            return
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

export function getDistributors(distributorService: DistributorService): RequestHandler {
    return async function (req, res, next) {
        const categories = await distributorService.getAllDistributors()

        res.status(StatusCodes.OK).json(categories)
    }
}

export function getDistributor(distributorService: DistributorService): RequestHandler {
    return async function (req, res, next) {
        const distributorId = parseInt(req.params.distributorId)
        if (isNaN(distributorId)) {
            res.status(StatusCodes.BAD_REQUEST).json("id is not valid")
            return
        }
        const distributor = await distributorService.getDistributor(distributorId)
        res.status(StatusCodes.OK).json(distributor)
    }
}

export function updateDistributor(distributorService: DistributorService): RequestHandler {
    return async function (req, res, next) {
        const distributorUpdateFormat = Joi.object().keys({
            id: Joi.not().allow(),
            name: Joi.string().required()
        })
        const {error} = distributorUpdateFormat.validate(req.body)
        if (error) {
            res.status(400).json(error)
            return
        }

        let category
        try {
            category = await distributorService.updateDistributor(req.body)
        } catch (err) {
            res.status(500).json(err)
        }

        res.status(200).json(category)
    }
}

export function deleteDistributor(distributorService: DistributorService): RequestHandler {
    return async function (req, res, next) {
        const distributorId = parseInt(req.params.distributorId)
        await distributorService.deleteDistributor(distributorId)
    }
}

function distributorRouter() {
    const router = Router()

    const distributorService = new DistributorService()

    router.get("/", getDistributors(distributorService))
    router.get("/:distributorId", getDistributor(distributorService))
    router.post("/update", updateDistributor(distributorService))
    router.post("/new", addNewDistributor(distributorService))
    router.post("/:distributorId/delete", deleteDistributor(distributorService))

    return router
}

export default distributorRouter
