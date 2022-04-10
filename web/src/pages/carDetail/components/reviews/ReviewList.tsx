import { Fragment } from "react"
import useSWR from "swr"
import fetcher from "../../../../utils/fetcher"
import IReview from "../../../../models/review"
import { List, Divider } from "@mui/material"
import ReviewItem from "./ReviewItem"
import LinearProgressWithLabel from "../LinearProgressWithLabel"
import ReviewListHeader from "./ReviewListHeader"
import NoReviewsView from "./NoReviewsView"

type Car = {
    carId: number
}

export default function ReviewList({ carId }: Car) {
    const { data, error } = useSWR<IReview[]>(`/api/cars/${carId}/reviews`, fetcher)

    if (!data) return <></>

    if (data.length == 0) {
        return <NoReviewsView />
    }

    const reviewCount = data.length
    const averageRating = data.reduce((avg, review) => avg + review.rating / reviewCount, 0)

    /*
    const reviewCount = data.length
    let averageRating = 0
    const reviewRatioByRating: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }

    data.forEach((review) => {
        reviewRatioByRating[review.rating] += 100 / reviewCount
        averageRating += review.rating / reviewCount
    })
    */

    return (
        <Fragment>
            <ReviewListHeader averageRating={averageRating} reviewCount={reviewCount} />
            <Divider />
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {data.map((review, index) => (
                    <Fragment>
                        <ReviewItem
                            key={index}
                            rating={review.rating}
                            comment={review.comment}
                            createdDate={review.createdDate}
                            isApproved={review.isApproved}
                        />
                        {index != data.length - 1 ? <Divider component="li" /> : null}
                    </Fragment>
                ))}
            </List>
        </Fragment>
    )
}
