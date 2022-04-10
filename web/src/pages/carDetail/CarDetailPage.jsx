import { useParams } from "react-router-dom"

import theme from "./theme"
import { ThemeProvider } from "@emotion/react"
import ReviewsButton from "./components/buttons/ReviewsButton"
import LeaveAReviewButton from "./components/buttons/LeaveAReviewButton"

function CarDetailPage() {
    const params = useParams()
    const { carId } = params
    const averageRating = 4.5
    const reviewCount = 555

    return (
        <ThemeProvider theme={theme}>
            <ReviewsButton carId={carId} averageRating={averageRating} reviewCount={reviewCount} />
            <LeaveAReviewButton carId={carId} />
        </ThemeProvider>
    )
}

export default CarDetailPage
