import { Router, RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"


const fs = require('fs')
const pdf = require('pdf-creator-node')
const path = require('path')


import UserService from "../services/userService"
import CartService from "../services/cartService"
import CarService from "../services/carService"
import CategoryService from "../services/categoryService"
var invoiceNum = 0



const options = {
    formate: 'A4',
    orientation: 'portrait',
    border: '0mm',
    header: {
        height: '15mm',
        
    },
    footer: {
    }
}
const mockdata = [
    {
        item: "Product 1",
        description: " Laisjf aksdjf akjfd",
        unitCost: 2300,
        quantity: 2
    },
    {
        item: "Product 2",
        description: " Laisjf aksdjf akjfd",
        unitCost: 130000,
        quantity: 1
    },
    {
        item: "Product 3",
        description: " Laisjf aksdjf akjfd",
        unitCost: 73483,
        quantity: 6
    }
    
]

interface invoicee {
    item: any,
    description: any;
    unitCost: any;
    quantity: any;
    lineTotal: any;
  }
   

//function generatePdf(userService: UserService, cartService: CartService) {
function generatePdf() {
    return async function (req, res, next) {
        // i will not parse anything yet
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const html = fs.readFileSync(path.join(__dirname, '../invoiceHtml.html'), 'utf-8')
        invoiceNum = invoiceNum+1
        const filename = invoiceNum+'purchaserId_'+'_doc'+'.pdf';
        const arrayy: invoicee [] = []
        


        mockdata.forEach( d => {
            const prod: invoicee = {
                item: d.item,
                description: d.description,
                unitCost: d.unitCost,
                quantity: d.quantity,
                lineTotal: d.quantity * d.unitCost,     
            }
            arrayy.push(prod);
        });

        let subtotal = 0;
        arrayy.forEach(i => {
            subtotal += i.lineTotal
        });

        const obj = {
            prodlist: arrayy,
            subtotal: subtotal,
            invoiceNumber: invoiceNum,
            name: 'Jeren',
            surname: 'Annagurbanova',
            address: 'Sabanci Universitesi Caddesi',
            region: 'Istanbul, Turkey',
            email: 'jerena@sabanciuniv.edu'
        }

        const document = {
            html: html,
            data: {
                products: obj
            },
            path: './src/docs/' + filename
        }

        pdf.create(document, options)
            .then(res => {
                console.log("should generate");
            }).catch(error => {
                console.log(error);
            });

            


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