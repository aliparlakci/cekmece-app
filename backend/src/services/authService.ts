import {  Repository } from "typeorm"
import * as jwt from "jsonwebtoken";

import { User } from "../models/user";
import db from "../dataSource"
import config from "../config";


export default class AuthService{
    private repository: Repository<User>

    constructor() {
        this.repository = db.getRepository(User)
    }

    async authenticate(username: string, password: string) {

        const user = await this.repository.findOne({ where: { username } })
        if (user === null) return false
        const result = user.checkIfUnencryptedPasswordIsValid(password)
        if (!result) return false

        return jwt.sign(
            { userId: user.id, username },
            config.jwtSecret,
            { expiresIn: "1h" }
        );
    }

    async authenticateByIdPassword(id: any, oldPassword: any) {

        const user = await this.repository.findOne({ where: { id } })
        if (user === null) return false
        const result = user.checkIfUnencryptedPasswordIsValid(oldPassword)
        if (!result) return false

        return user
    }



}