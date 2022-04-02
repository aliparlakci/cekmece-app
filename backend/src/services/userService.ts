import { Repository } from "typeorm"

import db from "../dataSource"
import { User } from "../models/user"

export default class UserService {
    private repository: Repository<User>

    constructor() {
        this.repository = db.getRepository(User)
    }

    async newCategory(candidate: User) {
        return await this.repository.save(candidate)
    }

    async getAllUsers() {
        return this.repository.find()
    }

    async getUser(id: string) {
        return this.repository.findOne({ where: { id } })
    }

    async deleteUser(id: string) {
        return this.repository.createQueryBuilder().delete().from(User).where("id = :id", { id })
    }
}
