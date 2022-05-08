import ICar from "./car"
import IUser from "./user"

export default interface ICart {
    id: number
    total: number
    quantity: number
    item: ICar
    user: IUser
}
