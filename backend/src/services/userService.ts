import { Repository } from "typeorm"
import db from "../dataSource"
import { User } from "../models/user"

export default class UserService {
    private repository: Repository<User>

    constructor() {
        this.repository = db.getRepository(User)
    }

    // async newCategory(candidate: User) {
    //     return await this.repository.save(candidate)
    // } changing this

    async newUser(candidate: User) {
        return await this.repository.save(candidate)
    }

    async getAllUsers() {
        return this.repository.find({ select: ["id", "username", "role"] })
    }

    async getUser(id: string) {
        return this.repository.findOne({ where: { id } })
    }

    async getUserByUsername(username: string) {
        return this.repository.findOne({ where: { username } })
    }

    async editUser(username: string, role: string, id: string){
        return this.repository.findOne({where: { username, role, id } })
    }
    
    async updateUser(user: User){
        return this.repository.save(user)
    }

    async deleteUser(id: string) {
        return this.repository.createQueryBuilder().delete().from(User).where("id = :id", { id })
    }
}
