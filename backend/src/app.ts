import express, { Router } from "express"
import createError from "http-errors"
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan"
import "reflect-metadata"

import carRouter from "./routes/carRouter"
import db from "./dataSource"
import categoryRouter from "./routes/categoryRouter"
import distributorRouter from "./routes/distributorRouter"
import cartRouter from "./routes/cartRouter"

async function main() {
    try {
        await db.initialize()
        console.log("Data Source has been initialized!")
    } catch (err) {
        console.error("Error during Data Source initialization:", err)
    }

    const app = express()

    app.use(logger("dev"))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())

    const v1 = Router()
    app.use("/api", v1)

    v1.use("/cars", carRouter())
    v1.use("/categories", categoryRouter())
    v1.use("/distributors", distributorRouter())
    v1.use("/cart", cartRouter())


    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404))
    })

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message
        res.locals.error = req.app.get("env") === "development" ? err : {}

        // render the error page
        res.status(err.status || 500)
        res.json(err)
    })

    app.listen(5001, () => {
        console.log("Listening on http://localhost:5001")
    })
}

main()
