import { Request, Response, NextFunction } from "express"

import UserService from "../services/userService"

export const checkRole = (userService: UserService) => (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //Get the user ID from previous midleware
        const id = res.locals.jwtPayload.userId

        //Get user role from the database
        let user
        try {
            user = await userService.getUser(id)
        } catch (id) {
            res.status(401).send()
        }

        //Check if array of authorized roles includes the user's role
        if (roles.indexOf(user.role) > -1) next()
        else res.status(401).send()
    }
}
