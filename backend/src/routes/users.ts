import { Router } from "express"

const usersRouter = Router()

/* GET users listing. */
usersRouter.get("/", function (req, res, next) {
    res.status(200)
    res.send("respond with a resource")
})

export default usersRouter
