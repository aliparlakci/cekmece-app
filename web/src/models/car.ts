import IDistributor from "./distributor"
import ICategory from './category'
import IReview from "./review"

interface ICar {
    id?: number
    name: string
    model: number
    number: number
    quantity: number
    price: number
    warranty: number
    distributor?: IDistributor
    category?: ICategory
    reviews?: IReview[]
    review_count: number,
    average_rating: number
}

export default ICar