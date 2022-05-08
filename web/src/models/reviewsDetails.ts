import IReviewRatioByRating from "./reviewRatioByRating"
import IReview from "./review"

interface IReviewsDetails {
    reviewCount: number
    averageRating: number
    reviewRatioByRating: IReviewRatioByRating
    reviews: IReview[]
}

export default IReviewsDetails
