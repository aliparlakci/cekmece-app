import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"

import UserService from "../services/userService"
import AuthService from "../services/authService";
import Context from "../utils/context";
import config from "../config"
import {StatusCodes} from "http-status-codes";

export const JWTAuth = (authService: AuthService, userService: UserService) => async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["token"]
    const ctx: Context | null = Context.get(req);
    if (ctx === null) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something bad happened")
        return
    }

    let userId: string
    try {
        const result = jwt.verify(token, config.jwtSecret)
        if (typeof result === "string") throw ``
        userId = result.userId
    } catch (error) {
        ctx.user = null
        res.cookie("token", "", { expires: new Date(0), path: "/" })
        next()
        return
    }

    const user = await userService.getUser(userId)
    if (user === null) {
        ctx.user = null
        res.cookie("token", "", { expires: new Date(0), path: "/" })
        next()
        return
    }

    ctx.user = user
    const newToken = authService.refreshToken(user.id)
    res.cookie("token", newToken, { maxAge: 7776000, path: "/" })

    next()
}
