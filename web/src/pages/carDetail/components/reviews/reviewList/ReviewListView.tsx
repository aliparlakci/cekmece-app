import { Fragment, useContext, useState } from "react"
import useSWR from "swr"
import fetcher from "../../../../../utils/fetcher"
import IReview from "../../../../../models/review"
import { Backdrop, CircularProgress, List, Divider } from "@mui/material"
import ReviewItem from "./components/ReviewItem"
import ReviewListHeader from "./components/ReviewListHeader"
import NoReviewsView from "./NoReviewsView"
import ErrorReviewListView from "./ErrorReviewListView"
import LoadingReviewListView from "./LoadingReviewListView"
import { styled } from "@mui/material/styles"
import IReviewsDetails from "../../../../../models/reviewsDetails"
import useAuth from "../../../../../hooks/useAuth"
import YourReviewsList from "./components/YourReviewsList"
import SnackbarHandler from "../SnackbarHandler"
import useFetch, { CachePolicies } from "use-http"

type Car = {
    carId: number
}

const StyledList = styled(List)(() => ({
    paddingTop: 0,
    paddingBottom: 0,
}))

export default function ReviewList({ carId }: Car) {
    const { data, mutate, error } = useSWR<IReviewsDetails>(`/api/cars/${carId}/reviews`, fetcher)
    const { user } = useAuth()
    const [successNotification, setSuccessNotification] = useState(false)
    const [errorNotification, setErrorNotification] = useState(false)
    const { del, response, loading } = useFetch(`/api/cars/${carId}/reviews`, {
        cachePolicy: CachePolicies.NO_CACHE,
        headers: { "Content-Type": "application/json" },
    })

    if (error) return <ErrorReviewListView />

    if (!data) return <LoadingReviewListView />

    if (data.reviews.length == 0)
        return (
            <>
                <SnackbarHandler
                    isSuccess={successNotification}
                    isError={errorNotification}
                    successMessage="Review deleted successfully."
                    errorMessage="An error occurred while deleting the review."
                    onSuccessClose={() => setSuccessNotification(false)}
                    onErrorClose={() => setErrorNotification(false)}
                />
                <NoReviewsView />
            </>
        )

    const yourReviews: IReview[] = []
    let reviews: IReview[] = []

    if (user) {
        data.reviews.forEach((review) => {
            if (review.user.id === user.id) {
                yourReviews.push(review)
            } else {
                reviews.push(review)
            }
        })
    } else {
        reviews = data.reviews
    }

    return (
        <Fragment>
            <SnackbarHandler
                isSuccess={successNotification}
                isError={errorNotification}
                successMessage="Review deleted successfully."
                errorMessage="An error occurred while deleting the review."
                onSuccessClose={() => setSuccessNotification(false)}
                onErrorClose={() => setErrorNotification(false)}
            />
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <ReviewListHeader
                averageRating={data.averageRating}
                reviewCount={data.reviewCount}
                reviewRatioByRating={data.reviewRatioByRating}
            />
            {yourReviews.length != 0 && (
                <YourReviewsList
                    carId={carId}
                    yourReviews={yourReviews}
                    mutate={mutate}
                    onSuccess={() => setSuccessNotification(true)}
                    onError={() => setErrorNotification(true)}
                    del={del}
                    response={response}
                />
            )}
            <StyledList sx={{ width: "100%", bgcolor: "background.paper" }}>
                {reviews.map((review, index) => (
                    <Fragment>
                        {index == 0 ? <Divider component="li" /> : null}
                        <ReviewItem
                            key={review.id}
                            reviewId={review.id}
                            carId={carId}
                            rating={review.rating}
                            comment={review.comment}
                            createdDate={review.createdDate}
                            isApproved={review.isApproved}
                            isYourReview={false}
                            mutate={mutate}
                            onSuccess={() => setSuccessNotification(true)}
                            onError={() => setErrorNotification(true)}
                            del={del}
                            response={response}
                        />
                        <Divider component="li" />
                    </Fragment>
                ))}
            </StyledList>
        </Fragment>
    )
}
