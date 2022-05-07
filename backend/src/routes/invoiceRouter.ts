import { Router, RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"

const fs = require("fs")
const pdf = require("pdf-creator-node")
const path = require("path")
var nodemailer = require("nodemailer")
var { google } = require("googleapis")

import UserService from "../services/userService"
import CartService from "../services/cartService"
import CarService from "../services/carService"
import CategoryService from "../services/categoryService"
var invoiceNum = 0

const CLIENT_ID = "459735410014-abdl6trcqt31ondndig3v7q150o6e6ss.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN =
    "1//04RHdO6QeVYgLCgYIARAAGAQSNgF-L9Ir90FZtbHxV5XzhocfbHa4FGsgnzCn1O-OGA1GUx-S-o1_Sv0GU4eJkGEMaqNZHUFWag"

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const options = {
    formate: "A4",
    orientation: "portrait",
    border: "0mm",
    header: {
        height: "15mm",
    },
    footer: {},
}
const mockdata = [
    {
        item: "Product 1",
        description: " Laisjf aksdjf akjfd",
        unitCost: 2300,
        quantity: 2,
    },
    {
        item: "Product 2",
        description: " Laisjf aksdjf akjfd",
        unitCost: 130000,
        quantity: 1,
    },
    {
        item: "Product 3",
        description: " Laisjf aksdjf akjfd",
        unitCost: 73483,
        quantity: 6,
    },
]

export interface invoicee {
    item: string
    description: string
    unitCost: number
    quantity: number
    lineTotal: number
}

function sendEmail() {
    try {
        const accessToken = oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "cs308myaraba@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
            tls: {
                rejectUnauthorized: true,
            },
        })

        const mailOptions = {
            from: "myArabaFrom <cs308myaraba@gmail.com>",
            to: "jerena@sabanciuniv.edu",
            subject: "Hello from gmail using API",
            text: "Hello from gmail email using API",
            attachments: [
                {
                    filename: `2purchaserId__doc.pdf`,
                    contentType: "application/pdf",
                    path: path.join(__dirname, "../docs/2purchaserId__doc.pdf"),
                },
            ],
        }

        const result = transport.sendMail(mailOptions)
        console.log("should send")
        return result
    } catch (error) {
        return error
    }
}

//function generatePdf(userService: UserService, cartService: CartService) {
function generatePdf(data: invoicee[]) {
    return async function (req, res, next) {
        // i will not parse anything yet
        var today = new Date()
        var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
        const html = fs.readFileSync(path.join(__dirname, "../invoiceHtml.html"), "utf-8")
        invoiceNum = invoiceNum + 1
        const filename = invoiceNum + "purchaserId_" + "_doc" + ".pdf"

        let subtotal = data.reduce((prev, item) => item.lineTotal + prev, 0)

        const obj = {
            prodlist: data,
            subtotal: subtotal,
            invoiceNumber: invoiceNum,
            name: "Jeren",
            surname: "Annagurbanova",
            address: "Sabanci Universitesi Caddesi",
            region: "Istanbul, Turkey",
            email: "jerena@sabanciuniv.edu",
        }

        const document = {
            html: html,
            data: {
                products: obj,
            },
            path: "./invoices/" + filename,
        }

        pdf.create(document, options)
            .then((res) => {
                console.log("should generate")
            })
            .catch((error) => {
                console.log(error)
            })
        sendEmail()
    }
}

function invoiceRouter() {
    const router = Router()
    const userService = new UserService()
    const categoryService = new CategoryService()
    const carService = new CarService(categoryService)
    const cartService = new CartService(userService, carService)

    router.get("/download", generatePdf())

    return router
}

export default invoiceRouter
