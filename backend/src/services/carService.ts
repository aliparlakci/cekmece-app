import db from "../dataSource"
import { Car } from "../models/car"
import { Category } from "../models/category"

export default class CarService {
    private repository

    constructor() {
        this.repository = db.getRepository(Car)
    }

    getAllCars(): Promise<Car[]> {
        return new Promise((resolve, reject) => resolve([]))
    }

    getCarsByCategory(category: Category): Promise<Category[]> {
        return new Promise((resolve, reject) => resolve([]))
    }
}