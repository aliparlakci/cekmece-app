import { Request, Response, NextFunction } from "express"

import { User } from "../models/user"

export const checkRole = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //Get the user ID from previous middleware
        const user: User = res.locals.user

        //Check if array of authorized roles includes the user's role
        if (roles.map(role => role.toLowerCase()).indexOf(user.role.toLowerCase()) === -1) {
            res.status(401).json()
            return
        }

        next()
    }
}
