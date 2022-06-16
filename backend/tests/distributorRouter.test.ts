import chai, { expect } from "chai"
import spies from "chai-spies"
import * as DistributorRouter from "../src/routes/distributorRouter"
import DistributorService from "../src/services/distributorService";
import Context from "../src/utils/context"
import {addNewCategory} from "../src/routes/categoryRouter";

chai.use(spies)

class MockResponse {
    status(code) {
        this.code = code
        return this
    }

    json(data) {
        this.body = data
        return this
    }

    code = -1
    body: any = {}
}

describe("Distributor router", () => {
    afterEach(() => {
        Context.reset()
    });

    [
        {
            request: {
                name: "Mercedes",
            },
            expected: 201
        },
        {
            request: {},
            expected: 400
        },
    ].map((value, index) => {
        it(`adds a new distributor #${index+1}`, async () => {
            const mockDistributorService = {} as DistributorService
            chai.spy.on(mockDistributorService, "newDistributor", () => new Promise((resolve, reject) => resolve(null)))

            const mockRequest = {
                body: value.request
            }
            const mockResponse = new MockResponse()
            Context.bind(mockRequest as any)

            const uut = DistributorRouter.addNewDistributor(mockDistributorService as DistributorService)
            await uut(mockRequest as any, mockResponse as any, () => null as any)

            expect(mockResponse.code).equals(value.expected)
        })
    })
})