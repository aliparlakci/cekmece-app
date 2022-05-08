import { Equal, IsNull, Not, Repository } from "typeorm"
import db from "../dataSource"
import { Order, OrderStatus, ShippingOption } from "../models/order"
import CarService from "./carService"
import UserService from "./userService"
import CartService from "./cartService"
import { OrderItem } from "../models/orderItem"
import { isNull } from "util"
import InvoiceService from "./invoiceService"

export default class OrderService {
    private repository: () => Repository<Order>
    private orderItemRepository: () => Repository<OrderItem>


    constructor(private carService: CarService, private cartService: CartService, private invoiceService: InvoiceService) {
        this.repository = () => db.getRepository(Order)
        this.orderItemRepository = () => db.getRepository(OrderItem)
    }

    async getAllOrders() {
        return await this.repository().find()
    }

    async getOrdersByUser(userId: string) {
        return await this.repository().find({
            relations: [
                "user",
                "orderItems",
                "orderItems.car",
                "orderItems.car.category",
                "orderItems.car.distributor",
            ],
            select: {
                user: {
                    id: true,
                },
            },

            where: {
                user: {
                    id: userId,
                },
            },

            order: {
                createdDate: "DESC",
            },
        })
    }

    async getOrderItem(orderItemId: string) {
        return await this.orderItemRepository().findOne({
            relations: ["order", "car"],
            select: {
                car: {
                    id: true,
                },
                order: {
                    id: true,
                    status: true,
                },
            },

            where: {
                id: orderItemId,
            },
        })
    }

    async getUnreviewedOrderItems(userId: string, carId: number) {
        const orderItems: OrderItem[] = await this.orderItemRepository().find({
            relations: ["order", "review"],

            select: {
                id: true,
                order: {
                    id: true,
                    createdDate: true,
                    updatedDate: true,
                },
            },

            where: {
                order: {
                    user: {
                        id: userId,
                    },
                    status: OrderStatus.DELIVERED,
                },
                car: {
                    id: carId,
                },
            },
        })

        const unreviewedOrderItems = orderItems.filter((orderItem) => {
            return orderItem.review === null
        })

        return unreviewedOrderItems
    }

    async checkUserCanReviewCar(userId: string, carId: number) {
        const orderItems: OrderItem[] = await this.orderItemRepository().find({
            relations: ["order", "review"],

            select: {
                id: true,
                order: {
                    id: true,
                    createdDate: true,
                    updatedDate: true,
                },
            },

            where: {
                order: {
                    user: {
                        id: userId,
                    },
                    status: OrderStatus.DELIVERED,
                },
                car: {
                    id: carId,
                },
            },
        })

        const unreviewedOrderItems = orderItems.filter((orderItem) => {
            return orderItem.review === null
        })

        return unreviewedOrderItems.length === 0 ? false : true
    }

    async newOrder(candidate: Order) {
        const cartItems = await this.cartService.getItemsInCard(candidate.user.id)

        if (cartItems.length == 0) {
            const error = new Error("Cart is empty.")
            error.name = "CartError"
            throw error
        }

        let i = 0
        const orderItems: OrderItem[] = []
        try {
            for (; i < cartItems.length; i++) {
                await this.carService.decreaseStock(cartItems[i].item.id, cartItems[i].quantity)
                orderItems.push({
                    total: cartItems[i].total,
                    quantity: cartItems[i].quantity,
                    car: cartItems[i].item,
                    order: candidate,
                } as OrderItem)
            }

            const subTotal = orderItems.map((item) => item.total).reduce((acc, next) => acc + next)

            candidate.subTotal = subTotal
            candidate.orderItems = orderItems

            if (candidate.shippingOption === ShippingOption.ONEDAY) {
                candidate.shipping = 15
            } else {
                candidate.shipping = 0
            }

            if (candidate.promoCode === "ADMIN") {
                candidate.discount = candidate.shipping + candidate.subTotal
            } else {
                candidate.discount = 0
            }

            candidate.total = candidate.subTotal + candidate.shipping - candidate.discount
            const result: Order = await this.repository().save(candidate)
          
//////////////////
            this.invoiceService.sendInvoice(result, result.user)



            await this.cartService.deleteUserCart(candidate.user.id)
            return result
        } catch (err) {
            for (let j = i - 1; j >= 0; j--) {
                await this.carService.increaseStock(cartItems[j].item.id, cartItems[j].quantity)
            }

            throw err
        }
    }

    async changeOrderStatus(id: number, status: OrderStatus) {
        const order = await this.repository().findOne({
            where: { id: id },
        })

        if (order === null) throw `Order with id ${id} does not exist.`
        order.status = status

        return await this.repository().save(order)
    }

    /*
    async saveReviewIdToOrderItem(id: string, reviewId: number) {
        const orderItem = await this.orderItemRepository().findOne({
            where: { id: id },
        })

        if (orderItem == null) throw `Order item with id ${id} does not exist.`

        orderItem.reviewId = reviewId

        return await this.repository().save(order)
    }
    */
}
