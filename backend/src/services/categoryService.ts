import {Repository} from "typeorm"

import db from "../dataSource"
import {Category} from "../models/category"

export default class CategoryService {
    private repository: () => Repository<Category>

    constructor() {
        this.repository = () => db.getRepository(Category)
    }

    async newCategory(candidate: Category) {
        return await this.repository().save(candidate)
    }

    async getAllCategories() {
        return this.repository().find({
            order: {
                name: "ASC"
            }
        })
    }

    async getCategory(id: number) {
        return this.repository().findOne({
            where: {id}
        })
    }

    async deleteCategory(id: number) {
        return this.repository().createQueryBuilder().delete().from(Category).where("id = :id", {id}).execute()
    }

    async updateCategory(category: Category) {
        return this.repository().save(category)
    }
}
