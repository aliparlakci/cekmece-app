import ICar from "./car"
import IUser from "./user"

interface IReview {
    id: number
    rating: number
    comment?: string
    createdDate: Date
    isApproved: boolean
    car: ICar
    user: IUser
}

export default IReview
