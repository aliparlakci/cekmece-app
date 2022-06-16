import { expect } from "chai"
import * as CarRouter from "../src/routes/carRouter"
import {Car} from "../src/models/car";
import CarService from "../src/services/carService";
import OrderService from "../src/services/orderService";
import Context from "../src/utils/context"

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
})