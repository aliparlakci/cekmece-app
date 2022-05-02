import { Router, RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import { validate } from "class-validator";

import UserService from "../services/userService"
import { checkRole } from "../middlewares/checkRole"
import {User} from "../models/user"
import userRoles from "../models/userRoles";
import Joi from "joi";

// get one user
function getUserById(userService: UserService): RequestHandler {
    return async function (req, res, next) {
        const id = req.params.id
        console.log(id)

        try {
            const user = await userService.getUser(id)
            if (!user) {
                res.status(StatusCodes.NOT_FOUND).json()
                return
            }

            res.status(StatusCodes.OK).json(user)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
            return
        }
    }
}

function newUser(userService: UserService): RequestHandler {
    return async function (req, res, next) {
        const newUserFormat = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            displayName: Joi.string().required()
        })

        const { error } = newUserFormat.validate(req.body)
        if (error) {
            res.status(400).json(error)
            return
        }

        try {
            await userService.newUser(req.body.displayName, req.body.email, req.body.password)
        } catch (e) {
            res.status(StatusCodes.BAD_REQUEST).json(e)
            return
        }

        res.status(StatusCodes.CREATED).json()
    }
}
//
// //edit one user
// function editUser(userService: UserService): RequestHandler {
//     return async function (req, res, next) {
//         const id = req.params.id
//         //Get values from the body
//         const { username, role } = req.body
//
//         //Try to find user on database
//         let user
//         try {
//             user = await userService.getUser(id)
//         } catch (error) {
//             //If not found, send a 404 response
//             res.status(404).send("User not found")
//             return
//         }
//
//         //Validate the new values on model
//         user.username = username
//         user.role = role
//         const errors = await validate(user)
//         if (errors.length > 0) {
//             res.status(400).send(errors)
//             return
//         }
//
//         //Try to safe, if fails, that means username already in use
//         try {
//             await userService.updateUser(user)
//         } catch (e) {
//             res.status(409).send("username already in use")
//             return
//         }
//         //After all send a 204 (no content, but accepted) response
//         res.status(204).send()
//     }
// }
//
// function deleteUser(userService: UserService): RequestHandler {
//     return async function (req, res, next) {
//         //Get the ID from the url
//         const id = req.params.id
//
//         try {
//             await userService.deleteUser(id)
//         } catch (error) {
//             res.status(404).send("User not found")
//             return
//         }
//
//         //After all send a 204 (no content, but accepted) response
//         res.status(204).send()
//     }
// }

function userRouter() {
    const router = Router()
    const userService = new UserService()

    router.get("/:id", getUserById)
    router.post("/", newUser(userService));

    return router
}

export default userRouter