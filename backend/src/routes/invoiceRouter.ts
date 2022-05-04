import { Router, RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"


const fs = require('fs')
const pdf = require('pdf-creator-node')
const path = require('path')


import UserService from "../services/userService"
import CartService from "../services/cartService"
import CarService from "../services/carService"
import CategoryService from "../services/categoryService"
//import { MockData } from "../mockData"


const options = {
    formate: 'A4',
    orientation: 'portrait',
    border: '2mm',
    header: {
        height: '15mm',
        contents: '<h4 style=" color: red;font-size:20;font-weight:800;text-align:center;">CUSTOMER INVOICE</h4>'
    },
    footer: {
        height: '20mm',
        contents: {
            first: 'Cover page',
            2: 'Second page',
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', 
            last: 'Last Page'
        }
    }
}
const mockdata = [
    {
        name: "Product 1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ullam repudiandae provident, deleniti ratione ipsum sunt porro deserunt",
        unit:"pack",
        quantity: 2,
        price: 20,
        imgurl: "https://micro-cdn.sumo.com/image-resize/sumo-convert?uri=https://media.sumo.com/storyimages/ef624259-6815-44e2-b905-580f927bd608&hash=aa79d9187ddde664f8b3060254f1a5d57655a3340145e011b5b5ad697addb9c0&format=webp"
    },
    {
        name: "Product 2",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ullam repudiandae provident, deleniti ratione ipsum sunt porro deserunt",
        unit:"pack",
        quantity: 4,
        price: 80,
        imgurl: "https://micro-cdn.sumo.com/image-resize/sumo-convert?uri=https://media.sumo.com/storyimages/ef624259-6815-44e2-b905-580f927bd608&hash=aa79d9187ddde664f8b3060254f1a5d57655a3340145e011b5b5ad697addb9c0&format=webp"
    },
    {
        name: "Product 3",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ullam repudiandae provident, deleniti ratione ipsum sunt porro deserunt",
        unit:"pack",
        quantity: 3,
        price: 60,
        imgurl: "https://micro-cdn.sumo.com/image-resize/sumo-convert?uri=https://media.sumo.com/storyimages/ef624259-6815-44e2-b905-580f927bd608&hash=aa79d9187ddde664f8b3060254f1a5d57655a3340145e011b5b5ad697addb9c0&format=webp"
    },
]

interface invoicee {
    name: any;
    description: any;
    unit: any;
    quantity: any;
    price: any;
    total: number;
    imgurl: any;
  }
   

//function generatePdf(userService: UserService, cartService: CartService) {
function generatePdf() {
    return async function (req, res, next) {
        // i will not parse anything yet
        const html = fs.readFileSync(path.join(__dirname, '../invoiceHtml.html'), 'utf-8')
        // may be we can add here userid or cartid
        const filename = Math.random()+'_doc'+'.pdf';
        const arrayy: invoicee [] = []


        mockdata.forEach( d => {
            const prod: invoicee = {
                name: d.name,
                description: d.description,
                unit: d.unit,
                quantity: d.quantity,
                price: d.price,
                total: d.quantity * d.price,
                imgurl: d.imgurl
            }
            arrayy.push(prod);
        });

        let subtotal = 0;
        arrayy.forEach(i => {
            subtotal += i.total
        });

        const tax = (subtotal * 20) / 100;
        const grandtotal = subtotal - tax;
        const obj = {
            prodlist: arrayy,
            subtotal: subtotal,
            tax: tax,
            gtotal: grandtotal
        }

        const document = {
            html: html,
            data: {
                products: obj
            },
            path: './docs/' + filename
        }

        pdf.create(document, options)
            .then(res => {
                console.log("should generate");
            }).catch(error => {
                console.log(error);
            });
           const filepath = 'http://localhost:5001/invoice/download/' + filename;

            // res.render('download', {
            //       path: filepath
            // });
           
            //res.sendFile(path.join(__dirname, '../invoiceHtml.html'));
              


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