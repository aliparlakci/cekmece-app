import { Router, RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"
import { validate } from "class-validator";

import UserService from "../services/userService"
import { checkJwt } from "../middlewares/checkJwt"
import { checkRole } from "../middlewares/checkRole"
import {User} from "../models/user"

// get one user
function getUserById(userService: UserService): RequestHandler {
    return async function (req, res, next) {
        const id = req.params.id

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

// get all userss
function listAllUsers(userService: UserService): RequestHandler {
    return async function (req, res, next) {
    const users = await userService.getAllUsers()
    //Send the users object
    
    res.status(200).json(users)
    }
}

// create new user
function newUser(userService: UserService): RequestHandler {
    return async function (req, res, next) {
        //Get parameters from the body
        let { username, password, role } = req.body
        let user = new User()
        user.username = username
        user.password = password
        user.role = role
        console.log({ username, password, role })

        //Validade if the parameters are ok
        const errors = await validate(user)
        if (errors.length > 0) {
            res.status(400).send(errors)
            return
        }

        //Hash the password, to securely store on DB
        user.hashPassword()

        //Try to save. If fails, the username is already in use
        try {
            await userService.newUser(user)
        } catch (e) {
            res.status(409).send("username already in use")
            return
        }

        //If all ok, send 201 response
        res.status(201).send("User created") 
    }
}

//edit one user
function editUser(userService: UserService): RequestHandler {
    return async function (req, res, next) {
        const id = req.params.id
        //Get values from the body
        const { username, role } = req.body

        //Try to find user on database
        let user
        try {
            user = await userService.getUser(id)
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("User not found")
            return
        }

        //Validate the new values on model
        user.username = username
        user.role = role
        const errors = await validate(user)
        if (errors.length > 0) {
            res.status(400).send(errors)
            return
        }

        //Try to safe, if fails, that means username already in use
        try {
            await userService.updateUser(user)
        } catch (e) {
            res.status(409).send("username already in use")
            return
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send()
    }
}

function deleteUser(userService: UserService): RequestHandler {
    return async function (req, res, next) {
        //Get the ID from the url
        const id = req.params.id

        try {
            await userService.deleteUser(id)
        } catch (error) {
            res.status(404).send("User not found")
            return
        }

        //After all send a 204 (no content, but accepted) response
        res.status(204).send()
    }
}

function userRouter() {
    const router = Router()
    const userService = new UserService()

    const checkRolesMiddleware = checkRole(userService)


    router.get("/", listAllUsers(userService)); 
    router.get("/:id([0-9]+)", [checkJwt, checkRolesMiddleware(["ADMIN"])], getUserById)
    router.post("/", newUser(userService));
    router.patch( "/:id([0-9]+)",[checkJwt, checkRolesMiddleware(["ADMIN"])], editUser(userService));
    router.delete("/:id([0-9]+)", [checkJwt, checkRolesMiddleware(["ADMIN"])], deleteUser(userService));
      

    return router
}

export default userRouter