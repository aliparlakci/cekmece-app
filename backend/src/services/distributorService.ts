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

    async getAllDistributors() {
        return this.repository.find({
            order: {
                name: "ASC"
            }
        })
    }

    async getDistributor(id: number) {
        return this.repository.findOne({ where: { id } })
    }

    async updateDistributor(distributor: Distributor) {
        return this.repository.save(distributor)
    }

    async deleteDistributor(id: number) {
        return this.repository.createQueryBuilder().delete().from(Distributor).where("id = :id", { id })
    }
}
