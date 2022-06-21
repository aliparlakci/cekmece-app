import ICar from "./car"
import IOrder from "./order"

interface IOrderItem {
    id: number
    total: number
    quantity: number
    car: ICar
    order: IOrder
}

export default IOrderItem
