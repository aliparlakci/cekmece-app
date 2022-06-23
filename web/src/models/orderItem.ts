import ICar from "./car"
import IOrder from "./order"
import IRefundRequest from "./refundRequest"

export enum ItemOrderStatus {
    PROCESSING = "processing",
    INTRANSIT = "in-transit",
    DELIVERED = "delivered",
    CANCELLED = "cancelled",
    RETURNED = "returned"
}

interface IOrderItem {
    id: number
    total: number
    quantity: number
    car: ICar
    order: IOrder
    status: ItemOrderStatus
    refund?: IRefundRequest
}

export default IOrderItem
