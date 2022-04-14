import { Router, Request, Response, RequestHandler } from "express"
import createError from "http-errors"
import { StatusCodes } from "http-status-codes"
import Joi from "joi"

import CategoryService from "../services/categoryService"

function addNewCategory(categoryService: CategoryService): RequestHandler {
    return async function (req, res, next) {
        const categoryFormat = Joi.object().keys({
            name: Joi.string().required(),
        })
        const { error } = categoryFormat.validate(req.body)
        if (error) {
            next(createError(StatusCodes.BAD_REQUEST))
        }
        
        // batu

        let id
        try {
            id = await categoryService.newCategory(req.body)
        } catch (err) {
            next(createError(StatusCodes.INTERNAL_SERVER_ERROR))
            return
        }

        res.status(StatusCodes.CREATED).json(id)
    }
}

function getCategories(categoryService: CategoryService): RequestHandler {
    return async function (req, res, next) {
        const categories = await categoryService.getAllCategories()

        res.status(StatusCodes.OK).json(categories)
    }
}

function getCategory(categoryService: CategoryService): RequestHandler {
    return async function (req, res, next) {
        const categoryId = parseInt(req.params.categoryId)
        const category = await categoryService.getCategory(categoryId)
        if (category === null) {
            res.status(StatusCodes.NOT_FOUND).json()
            return
        }

        res.status(StatusCodes.OK).json(category)
    }
}

function deleteCategory(categoryService: CategoryService): RequestHandler {
    return async function (req, res, next) {
        const categoryId = parseInt(req.params.categoryId)
        await categoryService.deleteCategory(categoryId)

        res.status(StatusCodes.OK).json()
    }
}

function updateCategory(categoryService: CategoryService): RequestHandler {
    return async function (req, res, next) {
        const categoryUpdateFormat = Joi.object().keys({
            id: Joi.not().allow(),
            name: Joi.string().required()
        })
        const { error } = categoryUpdateFormat.validate(req.body)
        if (error) {
            res.status(400).json(error)
            return
        }

        let category
        try {
            category = await categoryService.updateCategory(req.body)
        } catch (err) {
            res.status(500).json(err)
        }

        res.status(200).json(category)
    }
}

function categoryRouter() {
    const router = Router()

    const categoryService = new CategoryService()

    router.get("/", getCategories(categoryService))
    router.get("/:categoryId", getCategory(categoryService))
    router.post("/new", addNewCategory(categoryService))
    router.post("/update", updateCategory(categoryService))
    router.post("/:categoryId/delete", deleteCategory(categoryService))

    return router
}

export default categoryRouter
