
// import {  Repository } from "typeorm"
// import { Cart } from "../models/cart";
// import db from "../dataSource"


var api_key='fa21b77aaffa0277908600d66bfd4a88-02fa25a3-f8dddb76';
var domain='sandbox0119d76731aa4d31a70fb43580355250.mailgun.org';
var mailgun= require('mailgun-js')({apiKey: api_key, domain: domain});

var data = {
    from: 'Excited User <jerena@sabanciuniv.edu>',
    to: 'jerena@sabanciuniv.edu',
    subject: 'Check mailing service',
    text: 'Welcome to MyAraba! We are very excited to see you!'
};

mailgun.messages().send(data, function(error, body){
    if (error) {
        console.log(error);
    }
    console.log(body);
})

// export default class mailingService{
//     private repository: () => Repository<Cart>

//     constructor() {
//         this.repository = () => db.getRepository(Cart)
//     }

//     async textMessage(status: string, amount: string) {

//         const cartStatus = await this.repository().findOne({ where: { status } })
//         if (cartStatus === null) return false

//         return cartStatus;
//     }

    



// }