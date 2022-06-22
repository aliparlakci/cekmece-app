import { Repository } from "typeorm"
import db from "../dataSource"
<<<<<<< HEAD
import { Order, OrderStatus, ShippingOption } from "../models/order"
import CarService from "./carService"
import CartService from "./cartService"
import { OrderItem } from "../models/orderItem"
=======
import {Order, OrderStatus} from "../models/order"
import CarService from "./carService"
import CartService from "./cartService"
import {OrderItem, OrderStatus as ItemOrderStatus} from "../models/orderItem"
>>>>>>> 3334d336feaf1bc7959df700edf9bae118b0efff
import InvoiceService from "./invoiceService"
import {RefundRequest} from "../models/refundRequest";
import MailingService from "./mailingService";

export default class OrderService {
    private repository: () => Repository<Order>
    private orderItemRepository: () => Repository<OrderItem>
<<<<<<< HEAD

    constructor(
        private carService: CarService,
        private cartService: CartService,
        private invoiceService: InvoiceService
    ) {
=======
    private refundRequestRepository: () => Repository<RefundRequest>
    private mailingService: MailingService

    constructor(private carService: CarService, private cartService: CartService, private invoiceService: InvoiceService) {
>>>>>>> 3334d336feaf1bc7959df700edf9bae118b0efff
        this.repository = () => db.getRepository(Order)
        this.orderItemRepository = () => db.getRepository(OrderItem)
        this.refundRequestRepository = () => db.getRepository(RefundRequest)
        this.mailingService = new MailingService()
    }

    async getAllOrders() {
        return this.repository().find({
            order: {
                createdDate: "DESC",
            },
            relations: {
                orderItems: {
                    car: {
                        distributor: true,
                        category: true,
                    },
                    order: {
                        user: true,
                    },
                },
                user: true,
            },
        })
    }

    async getOrder(id) {
        return await this.repository().findOne({
            where: {
                id: id,
            },
            relations: {
                orderItems: {
                    car: {
                        distributor: true,
                        category: true,
                    },
                },
            },
        })
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

    async getOrderItem(orderItemId: number) {
        return await this.orderItemRepository().findOne({
            relations: ["order", "car"],
            select: {
                car: {
                    id: true,
                },
                order: {
                    id: true,
                    status: true,
                    invoice: true,
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
                },
                car: {
                    id: carId,
                },
                status: OrderStatus.DELIVERED,
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
                },
                car: {
                    id: carId,
                },
                status: OrderStatus.DELIVERED,
            },
        })

        console.log(orderItems)

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
                    total: (cartItems[i].quantity * cartItems[i].item.price * (100 - cartItems[i].item.discount)) / 100,
                    quantity: cartItems[i].quantity,
                    car: cartItems[i].item,
                    order: candidate,
                    status: OrderStatus.PROCESSING,
                } as OrderItem)
            }

            candidate.total = orderItems.reduce((acc, next) => acc + next.total, 0)
            candidate.subTotal = candidate.total
            candidate.orderItems = orderItems

            const result: Order = await this.repository().save(candidate)
            const order = await this.repository().findOne({
                where: {
                    id: result.id,
                },
                relations: {
                    orderItems: {
                        car: {
                            distributor: true,
                        },
                    },
                },
            })
            const pdf = await this.invoiceService.generatePdf(order || result, result.user)

            await this.repository().update({ id: result.id }, { invoice: pdf })

            await this.cartService.deleteUserCart(candidate.user.id)

            await this.invoiceService.sendInvoice(result, result.user, pdf)
            return [result, pdf]
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

    async changeOrderItemStatus(id, status) {
        return await this.orderItemRepository().update({ id: id }, { status: status })
    }

    async getRefundRequests() {
        return await this.refundRequestRepository().find({
            relations: {
                orderItem: {
                    order: {
                        user: true
                    },
                    car: {
                        distributor: true,
                        category: true,
                    },
                },
            }
        })
    }

    async newRefundRequest(orderItemId: number) {
        const orderItem = await this.orderItemRepository().findOne({
            where: {
                id: orderItemId
            },
            relations: {
                order: true
            }
        })
        if (orderItem === null) throw `Order item does not exist [id=${orderItemId}]`

        const today = new Date()
        const days = (today.getTime() - orderItem?.order.createdDate.getTime()) / (1000 * 3600 * 24)
        if (days > 30) {
            throw `Order is registered more than 30 days ago!`
        }

        if (orderItem.status === ItemOrderStatus.CANCELLED || orderItem.status === ItemOrderStatus.RETURNED) {
            throw `Order is already refunded`
        }

        return await this.refundRequestRepository().insert({ orderItem } as RefundRequest)
    }

    async approveRefundRequest(refundRequestId: number) {
        const refundRequest = await this.refundRequestRepository().findOne({
            where: {
                id: refundRequestId
            },
            relations: {
                orderItem: {
                    car: {
                        distributor: true
                    },
                    order: {
                        user: true
                    }
                }
            }
        })

        if (refundRequest === null) throw `RefundRequest does not exist [id=${refundRequestId}]`

        const orderItemStatus = refundRequest.orderItem.status
        if (orderItemStatus === ItemOrderStatus.PROCESSING || orderItemStatus === ItemOrderStatus.INTRANSIT) {
            this.orderItemRepository().update({ id: refundRequest.orderItem.id }, { status: ItemOrderStatus.CANCELLED })
        } else if (orderItemStatus === ItemOrderStatus.DELIVERED) {
            this.orderItemRepository().update({ id: refundRequest.orderItem.id }, { status: ItemOrderStatus.RETURNED })
        }

        try {
            await this.carService.increaseStock(refundRequest.orderItem.car.id, refundRequest.orderItem.quantity)
        } catch (err) {
            await this.orderItemRepository().update({ id: refundRequest.orderItem.id }, { status: orderItemStatus })
            throw err
        }

        await this.refundRequestRepository().update({ id: refundRequestId }, { isApproved: true })

        const subject = "You refund request has been approved!"
        const body = `Your refund request of ${refundRequest.orderItem.car.distributor.name} ${refundRequest.orderItem.car.name} has been approved.
        Total of $${refundRequest.orderItem.total} is refunded to your credit card.`
        this.mailingService.sendMail(refundRequest.orderItem.order.user.email, subject, body).catch(console.error)
    }

    async disapproveRefundRequest(refundRequestId: number) {
        const refundRequest = await this.refundRequestRepository().findOne({
            where: {
                id: refundRequestId
            },
            relations: {
                orderItem: {
                    car: {
                        distributor: true
                    },
                    order: {
                        user: true
                    }
                }
            }
        })

        if (refundRequest === null) throw `RefundRequest does not exist [id=${refundRequestId}]`

        await this.refundRequestRepository().delete({ id: refundRequestId })

        const subject = "You refund request has been rejected!"
        const body = `Your refund request of ${refundRequest.orderItem.car.distributor.name} ${refundRequest.orderItem.car.name} has been rejected.`
        this.mailingService.sendMail(refundRequest.orderItem.order.user.email, subject, body).catch(console.error)
    }
}