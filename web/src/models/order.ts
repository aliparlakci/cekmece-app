import IDistributor from "./distributor"
import ICategory from "./category"
import IReview from "./review"
import IUser from "./user"
import IOrderItem from "./orderItem"

enum OrderStatus {
    PROCESSING = "processing",
    INTRANSIT = "in-transit",
    DELIVERED = "delivered",
}

enum ShippingOption {
    FREE = "free",
    ONEDAY = "one-day",
}

interface IOrder {
    id: number
    subTotal: number
    shipping: number
    discount: number
    total: number
    status: OrderStatus
    promoCode?: string
    createdDate: Date
    updatedDate: Date
    addressLine1: string
    addressLine2?: string
    city: string
    province?: string
    zipCode: number
    country: string
    shippingOption: ShippingOption
    user: IUser
    orderItems: IOrderItem[]
}

export default IOrder
