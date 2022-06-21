import ICar from "./car"
import IUser from "./user"

export enum ApprovalStatus {
    IN_PROGRESS = "in-progress",
    APPROVED = "approved",
}

interface IReview {
    id: number
    rating: number
    comment?: string
    createdDate: Date
    approvalStatus: ApprovalStatus
    car: ICar
    user: IUser
}

export default IReview
