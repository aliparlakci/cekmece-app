import { Router } from "express"
import CarService from "../services/carService"

function getUsers(carService: CarService) {
    return function (req, res, next) {

        carService.getAllCars()

        res.status(200)
        res.send("respond with a resource")
    }
}

function carRouter() {
    const router = Router()

    router.get("/", getUsers(new CarService()))

    return router
}

export default carRouter
