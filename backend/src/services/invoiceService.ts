import {Repository} from "typeorm"

import db from "../dataSource"
import {Category} from "../models/category"
import {User} from "../models/user"
import UserService from "./userService"
import { Order } from "../models/order"

const fs = require("fs")
const pdf = require("pdf-creator-node")
const path = require("path")
var nodemailer = require("nodemailer")
var { google } = require("googleapis")


const CLIENT_ID = "1031671042635-2o9nh80hb5ftf73udu11kerq9busm86k.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//04NRrydOL4e0aCgYIARAAGAQSNgF-L9IrzXIzuDmQaZQOkiuGs4aVyfrtbY8K1SUch0b66a1N_CKFiwnWL3ai_UkWlfL4niEsWg"


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

var invoiceNum = 0

// const mockdata = [
//     {
//         item: "Product 1",
//         description: " Laisjf aksdjf akjfd",
//         unitCost: 2300,
//         quantity: 2,
//     },
//     {
//         item: "Product 2",
//         description: " Laisjf aksdjf akjfd",
//         unitCost: 130000,
//         quantity: 1,
//     },
//     {
//         item: "Product 3",
//         description: " Laisjf aksdjf akjfd",
//         unitCost: 73483,
//         quantity: 6,
//     },
// ]

const options = {
    formate: "A4",
    orientation: "portrait",
    border: "0mm",
    header: {
        height: "15mm",
    },
    footer: {},
}

export interface IInvoiceData {
    item: string
    description: string
    unitCost: number
    quantity: number 
}


async function generatePdf(order: Order, user: User) {
    
    var today = new Date()
    //var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    const html = fs.readFileSync(path.join(__dirname, "../invoiceHtml.html"), "utf-8")
    invoiceNum = invoiceNum + 1
    const filename = `${order.id}_${user.id}.pdf`


    const data: IInvoiceData[] = []
    let i = 0
    for (; i < order.orderItems.length; i++) {
        data.push({
            item: order.orderItems[i].car.name,
            description: order.orderItems[i].car.name,
            unitCost: order.orderItems[i].car.price,
            quantity: order.orderItems[i].quantity
        })
    }

    
    const withLineTotal = data.map(item => ({ ...item, lineTotal: item.quantity * item.unitCost}))
    

    const obj = {
        prodlist: withLineTotal,
        subtotal: order.subTotal,
        invoiceNumber: invoiceNum,
        name: user.displayName,
        address: order.addressLine1,
        region: order.country,
        email: user.email,
    }

    const document = {
        html: html,
        data: {
            products: obj,
        },
        path: path.join(__dirname, "../invoices/"+filename)
    }

    await pdf.create(document, options)
        .then((res) => {
            console.log("should generate")
        })
        .catch((error) => {
            console.log(error)
        })
}


export default class InvoiceService {
    constructor(private userService: UserService) {}
    

    async sendInvoice(order: Order, user: User, ) {
        

        await generatePdf(order, user)
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
                from: "CarWow <cs308myaraba@gmail.com>",
                to: user.email,
                subject: "Purchase Invoice",
                text: "Please find attached invoice below! Thank you for choosing CarWow!",
       
                
                attachments: [
                    {
                        filename: invoiceNum + user.id + "_invoice" + ".pdf" ,
                        contentType: "application/pdf",
                        path: path.join(__dirname, "..", "invoices", `${order.id}_${user.id}.pdf`),
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
}
