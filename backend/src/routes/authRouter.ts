import { Router, RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"

import AuthService from "../services/authService"
import UserService from "../services/userService"
import { User } from "../models/user"
import Context from "../utils/context"

function login(authService: AuthService): RequestHandler {
    return async function (req, res) {
        const email = req.body.email as string
        const password = req.body.password as string

        if (!(email && password)) {
            res.status(400).json()
            return
        }

        const token = await authService.authenticate(email, password)
        if (!token) {
            res.cookie("token", "", { expires: new Date(0), path: "/" })
            res.status(StatusCodes.BAD_REQUEST).json()
            return
        }
        //Send the jwt in the response
        res.cookie("token", token, { maxAge: 7776000, path: "/" })
        res.status(StatusCodes.OK).json(token)
    }
}

function logout(): RequestHandler {
    return function (req, res) {
        res.removeHeader("set-cookie")
        res.clearCookie("token")
        res.status(StatusCodes.OK).json()
    }
}

function me(): RequestHandler {
    return function (req, res) {
        const ctx: Context | null = Context.get(req)
        if (ctx === null) {
            res.status(StatusCodes.NOT_FOUND).json()
            return
        }

        const user = ctx.user
        if (user === null) {
            res.status(StatusCodes.NOT_FOUND).json()
            return
        }

        res.status(StatusCodes.OK).json({
            id: user.id,
            email: user.email,
            displayName: user.displayName,
        })
    }
}

function authRouter() {
    const router = Router()
    const userService = new UserService()
    const authService = new AuthService(userService)

    router.post("/login", login(authService))
    router.get("/me", me())
    router.post("/logout", logout())

    return router
}

export default authRouter
