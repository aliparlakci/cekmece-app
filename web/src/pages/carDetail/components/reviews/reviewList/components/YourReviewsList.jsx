import { Fragment } from "react"
import { Typography, Box, List, Divider } from "@mui/material"
import ReviewItem from "./ReviewItem"
import { styled } from "@mui/material/styles"

const StyledList = styled(List)(() => ({
    paddingTop: 0,
    paddingBottom: 0,
}))

function YourReviewsList({ carId, yourReviews, mutate, onSuccess, onError, del, response }) {
    return (
        <Box sx={{ background: "linear-gradient(62deg, #6faeed 0%, #c899f5 100%)", pl: 1.5, pr: 1.5, pb: 1.5 }}>
            <Box
                display="flex"
                justifyContent="center"
                textAlign="center"
                alignItems="center"
                sx={{ pt: 1.5, pb: 1.5 }}
            >
                <Typography variant="h6" sx={{ display: "inline", fontWeight: 700, color: "white" }} component="span">
                    YOUR
                </Typography>
                <Typography variant="h6" sx={{ paddingLeft: 1, fontWeight: 400, color: "white" }} component="span">
                    REVIEW(S)
                </Typography>
            </Box>
            <StyledList sx={{ width: "100%", bgcolor: "white", borderRadius: 2, pt: 0.5, pb: 0.5 }}>
                {yourReviews.map((review, index) => (
                    <Fragment>
                        {index !== 0 ? <Divider component="li" /> : null}
                        <ReviewItem
                            key={review.id}
                            reviewId={review.id}
                            carId={carId}
                            rating={review.rating}
                            comment={review.comment}
                            createdDate={review.createdDate}
                            isApproved={review.isApproved}
                            isYourReview={true}
                            mutate={mutate}
                            onSuccess={onSuccess}
                            onError={onError}
                            del={del}
                            response={response}
                        />
                    </Fragment>
                ))}
            </StyledList>
        </Box>
    )
}

export default YourReviewsList
