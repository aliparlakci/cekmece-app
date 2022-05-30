import { Request, Response, NextFunction } from "express"

import { User } from "../models/user"
import {StatusCodes} from "http-status-codes";
import Context from "../utils/context";

export const checkRole = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //Get the user ID from previous middleware
        const ctx: Context | null = Context.get(req)
        if (ctx === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You must be logged in to be able to order.",
            })
            return
        }

        const user = ctx.user
        if (user === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: "You must be logged in to be able to order.",
            })
            return
        }

        //Check if array of authorized roles includes the user's role
        if (roles.map(role => role.toLowerCase()).indexOf(user.role.toLowerCase()) === -1) {
            res.status(StatusCodes.UNAUTHORIZED).json()
            return
        }

        next()
    }
}
