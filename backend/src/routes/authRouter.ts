import { Router, RequestHandler } from "express"
import createError from "http-errors"
import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";


import { User } from "../models/user";
import AuthService from "../services/authService";
import { checkJwt } from "../middlewares/checkJwt"
import config from "../config";
import UserService from "../services/userService";

function login(authService: AuthService, userService: UserService): RequestHandler{
    return async function (req, res, next) {
        const username = req.body.username as string 
        const password = req.body.password as string

        //Check if username and password are set
        if (!(username && password)) {
            res.status(400).send();
        }
        
        // //Get user from the database
        // const user = await userService.getUserByUsername(username)

        const token = await authService.authenticate(username, password)
        if (!token) {
            res.status(400).send();
            return
        }
        //Send the jwt in the response
        res.send(token)  
    }
}

function changePassword(authService: AuthService, userService: UserService): RequestHandler{
    return async function (req, res, next) {
        //Get ID from JWT
        const id = res.locals.jwtPayload.userid;

        //Get parameters from the body
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).send();
            return
        }

        const user = await authService.authenticateByIdPassword(id, oldPassword)
        
        if (!user){
            res.status(401).send();
            return
        }

        //Validate de model (password lenght)
        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Hash the new password and save
        user.hashPassword();
        userService.updateUser(user);

        res.status(204).send();

    }
}





function authRouter() {
    const router = Router()
    const authServise = new AuthService()
    const userService = new UserService()

    router.post("/login", login(authServise, userService))
    router.post("/change-password", [checkJwt], changePassword(authServise, userService))

    return router
}

export default authRouter


