import * as jwt from "jsonwebtoken"

import UserService from "./userService";
import config from "../config"

export default class AuthService {
    constructor(public userService: UserService) {}

    async authenticate(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email)
        if (user === null) return null

        const result = user.verifyPassword(password)
        if (!result) return null

        return this.refreshToken(user.id)
    }

    refreshToken(userId: string) {
        return jwt.sign({ userId }, config.jwtSecret, {
            expiresIn: "24h",
        })
    }
}
