import chai, { expect } from "chai"
import spies from "chai-spies"
import * as CarRouter from "../src/routes/carRouter"
import {Car} from "../src/models/car";
import CarService from "../src/services/carService";
import OrderService from "../src/services/orderService";
import Context from "../src/utils/context"
import Joi from "joi";

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

describe("Car router", () => {
    afterEach(() => {
        Context.reset()
    })

    it("retrieves a specific car", async () => {
        const mockCarService = {
            async getCar(carId: number): Promise<Car | null> {
                return new Promise(resolve => resolve({
                    id: 5
                } as Car))
            }
        }
        const mockOrderService = {
            async checkUserCanReviewCar(userId: string, carId: number) {
                return new Promise(resolve => resolve(true))
            }
        }

        const uut = CarRouter.getCar(mockCarService as CarService, mockOrderService as OrderService)
        const mockRequest = {
            params: {
                carId: "5"
            }
        }
        const mockResponse = new MockResponse()
        Context.bind(mockRequest as any)

        await uut(mockRequest as any, mockResponse as any, {} as any)

        expect(mockResponse.code).equals(200)
        expect(mockResponse.body.id).equals(5)
    })

    it("filters cars", async () => {
        const mockCarService = {} as CarService
        chai.spy.on(mockCarService, "filterCars", () => new Promise((resolve, reject) => resolve([{id: 2}, {id: 3}])))
        const mockRequest = {
            query: {
                category: "5",
                distributor: "6",
                sort: "priceLow",
            }
        }
        const mockResponse = new MockResponse()
        Context.bind(mockRequest as any)

        const uut = CarRouter.getAllCars(mockCarService as CarService)
        await uut(mockRequest as any, mockResponse as any, {} as any)

        expect(mockResponse.code).equals(200)
        expect(mockResponse.body.length).equals(2)
    });

    [
        {
            request: {
                name: "Mercedes",
                model: "2015",
                number: "5",
                quantity: "10",
                price: "80000",
                warranty: "9",
                distributor: "10",
                category: "56",
            },
            expected: 201
        },
        {
            request: {
                name: "Mercedes",
                model: "-5",
                number: "5",
                quantity: "10",
                price: "80000",
                warranty: "9",
                distributor: "10",
                category: "56",
            },
            expected: 400
        },
        {
            request: {
                name: "Mercedes",
                model: "2025",
                number: "5",
                quantity: "10",
                price: "80000",
                warranty: "9",
                distributor: "10",
                category: "56",
            },
            expected: 400
        },
        {
            request: {
                name: "Mercedes",
                model: "2015",
            },
            expected: 400
        }
    ].map((value, index) => {
        it(`adds a new car #${index+1}`, async () => {
            const mockCarService = {} as CarService
            chai.spy.on(mockCarService, "insertCar", () => new Promise((resolve, reject) => resolve(null)))

            const mockRequest = {
                body: value.request
            }
            const mockResponse = new MockResponse()
            Context.bind(mockRequest as any)

            const uut = CarRouter.addNewCar(mockCarService as CarService)
            await uut(mockRequest as any, mockResponse as any, {} as any)

            expect(mockResponse.code).equals(value.expected)
        })
    })
})