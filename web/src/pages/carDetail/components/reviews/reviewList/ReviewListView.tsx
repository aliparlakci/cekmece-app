import { Fragment } from "react"
import useSWR from "swr"
import fetcher from "../../../../../utils/fetcher"
import IReview from "../../../../../models/review"
import { List, Divider } from "@mui/material"
import ReviewItem from "./components/ReviewItem"
import ReviewListHeader from "./components/ReviewListHeader"
import NoReviewsView from "./NoReviewsView"
import ErrorReviewListView from "./ErrorReviewListView"
import LoadingReviewListView from "./LoadingReviewListView"
import { styled } from "@mui/material/styles"

type Car = {
    carId: number
}

const StyledList = styled(List)(() => ({
    paddingTop: 0,
    paddingBottom: 0,
}))

export default function ReviewList({ carId }: Car) {
    const { data, error } = useSWR<IReview[]>(`/api/cars/${carId}/reviews`, fetcher)

    if (error) return <ErrorReviewListView />

    if (!data) return <LoadingReviewListView />

    if (data.length == 0) return <NoReviewsView />

    /*
    const reviewCount = data.length
    const averageRating = data.reduce((avg, review) => avg + review.rating / reviewCount, 0)
    */

    const reviewCount = data.length
    let averageRating = 0
    const reviewRatioByRating: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }

    data.forEach((review) => {
        reviewRatioByRating[review.rating] += 100 / reviewCount
        averageRating += review.rating / reviewCount
    })

    return (
        <Fragment>
            <ReviewListHeader
                averageRating={averageRating}
                reviewCount={reviewCount}
                reviewRatioByRating={reviewRatioByRating}
            />
            <StyledList sx={{ width: "100%", bgcolor: "background.paper" }}>
                {data.map((review, index) => (
                    <Fragment>
                        {index == 0 ? <Divider component="li" /> : null}
                        <ReviewItem
                            key={index}
                            rating={review.rating}
                            comment={review.comment}
                            createdDate={review.createdDate}
                            isApproved={review.isApproved}
                        />
                        <Divider component="li" />
                    </Fragment>
                ))}
            </StyledList>
        </Fragment>
    )
}
