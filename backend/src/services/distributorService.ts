import { Repository } from "typeorm"

import db from "../dataSource"
import { Distributor } from "../models/distributor"

export default class DistributorService {
    private repository: Repository<Distributor>

    constructor() {
        this.repository = db.getRepository(Distributor)
    }

    async newDistributor(candidate: Distributor) {
        return await this.repository.save(candidate)
    }

    async getAllCategories() {
        return this.repository.find()
    }

    async getDistributor(id: number) {
        return this.repository.findOne({ where: { id } })
    }

    async deleteDistributor(id: number) {
        return this.repository.createQueryBuilder().delete().from(Distributor).where("id = :id", { id })
    }
}
