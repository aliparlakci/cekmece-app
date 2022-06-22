import ICar from "./car"
import IOrder from "./order"

enum OrderStatus {
    PROCESSING = "processing",
    INTRANSIT = "in-transit",
    DELIVERED = "delivered",
}

interface IOrderItem {
    id: number
    total: number
    quantity: number
    car: ICar
    order: IOrder
    status: OrderStatus
}

export default IOrderItem
