import { Repository } from "typeorm"
import db from "../dataSource"
import { User } from "../models/user"
import UserRoles from "../models/userRoles";

export default class UserService {
    private repository: () => Repository<User>

    constructor() {
        this.repository = () => db.getRepository(User)
    }

    async newUser(displayName: string, email: string, password: string) {
        const user = new User()
        user.email = email
        user.displayName = displayName
        user.role = UserRoles.Customer
        user.setPassword(password)

        return await this.repository().save(user)
    }

    async getAllUsers() {
        return this.repository().find({ select: ["id", "email", "role"] })
    }

    async getUser(id: string) {
        return this.repository().findOne({ where: { id } })
    }

    async getUserByEmail(email: string) {
        return this.repository().findOne({ where: { email } })
    }

    async editUser(email: string, role: string, id: string){
        return this.repository().findOne({ where: { email, role, id } })
    }
    
    async updateUser(user: User){
        return this.repository().save(user)
    }

    async deleteUser(id: string) {
        return this.repository().createQueryBuilder().delete().from(User).where("id = :id", { id })
    }
}
