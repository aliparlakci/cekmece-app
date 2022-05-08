import ICar from "./car"

interface IOrderItem {
    id: number
    total: number
    quantity: number
    car: ICar
}

export default IOrderItem
