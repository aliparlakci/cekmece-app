

import { doesNotMatch } from "assert";
import chai from "chai";
import chaiHttp from "chai-http"; // my express app
var should = chai.should();
var server = require("../src/app")

chai.use(chaiHttp);



describe('API Tests', function() {

  it ('returns async', function() {
    return new Promise<void>(async function (resolve) {
      console.log("here");
       chai.request(server).get("/api/cars")
         .then(function(response) {
           console.log(response);
           response.should.have.status(200);
            resolve();
         });

      console.log("here2");

    });
  })

});


