import chai, { expect } from "chai"
import spies from "chai-spies"
import * as CategoryRouter from "../src/routes/categoryRouter"
import CategoryService from "../src/services/categoryService";
import Context from "../src/utils/context"

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

describe("Category router", () => {
    afterEach(() => {
        Context.reset()
    });

    [
        {
            request: {
                name: "Sedan",
            },
            expected: 201
        },
        {
            request: {},
            expected: 400
        },
    ].map((value, index) => {
        it(`adds a new category #${index+1}`, async () => {
            const mockCategoryService = {} as CategoryService
            chai.spy.on(mockCategoryService, "newCategory", () => new Promise((resolve, reject) => resolve(null)))

            const mockRequest = {
                body: value.request
            }
            const mockResponse = new MockResponse()
            Context.bind(mockRequest as any)

            const uut = CategoryRouter.addNewCategory(mockCategoryService as CategoryService)
            await uut(mockRequest as any, mockResponse as any, () => null as any)

            expect(mockResponse.code).equals(value.expected)
        })
    })
})