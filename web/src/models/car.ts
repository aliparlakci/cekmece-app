import IDistributor from "./distributor"
import ICategory from './category'

interface ICar {
    id?: number
    name: string
    model: number
    number: number
    quantity: number
    price: number
    warranty: number
    distributor: IDistributor
    categories: ICategory[]
}

export default ICar