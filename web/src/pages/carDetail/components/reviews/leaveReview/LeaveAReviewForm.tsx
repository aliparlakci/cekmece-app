import useSWR from "swr"
import fetcher from "../../../../../utils/fetcher"
import { useState, useEffect, useContext } from "react"
import { Box, Backdrop, CircularProgress } from "@mui/material"
import LeaveAReviewHeader from "./components/LeaveAReviewHeader"
import useFetch, { CachePolicies } from "use-http"
import SnackbarHandler from "../SnackbarHandler"
import LeaveAReviewFields from "./components/LeaveAReviewFields"
import SubmitReviewButton from "./components/SubmitReviewButton"
import ErrorLeaveAReviewForm from "./components/ErrorLeaveAReviewForm"

import IUnreviewedOrderItem from "../../../../../models/unreviewedOrderItem"

function LeaveAReviewForm({ carId }) {
    const { data, mutate, error } = useSWR<IUnreviewedOrderItem[]>(`/api/orders/unreviewed/${carId}`, fetcher)
    const [orderItemID, setOrderItemID] = useState("")
    const [rating, setRating] = useState(3)
    const [comment, setComment] = useState("")
    const [validationFailedAtLeastOnce, setValidationFailedAtLeastOnce] = useState(false)
    const [formValidationError, setFormValidationError] = useState(false)
    const [formValidationErrorMessage, setFormValidationErrorMessage] = useState("")

    const [successNotification, setSuccessNotification] = useState(false)
    const [errorNotification, setErrorNotification] = useState(false)
    const { post, response, loading } = useFetch(`/api/cars/${carId}/reviews`, {
        cachePolicy: CachePolicies.NO_CACHE,
        headers: { "Content-Type": "application/json" },
    })

    const handleOrderOnChange = (event) => {
        console.log(event.target.value)
        setOrderItemID(event.target.value)
    }

    const validateComment = (toValidate) => {
        const input = toValidate.trim()
        if (input.length > 0 && input.length < 3) {
            setFormValidationError(true)
            setValidationFailedAtLeastOnce(true)
            setFormValidationErrorMessage("A comment must have at least 3 characters.")
        } else if (input.length > 1000) {
            setFormValidationError(true)
            setValidationFailedAtLeastOnce(true)
            setFormValidationErrorMessage("A comment can have at most 1000 characters.")
        } else {
            setFormValidationError(false)
            setFormValidationErrorMessage("")
        }
    }

    const handleRatingOnChange = (event, newRating) => {
        if (newRating != null) {
            setRating(newRating)
        }
    }

    const handleTextFieldOnBlur = (event) => {
        validateComment(event.target.value)
    }

    const handleTextFieldOnChange = (event) => {
        setComment(event.target.value)
        if (validationFailedAtLeastOnce) {
            validateComment(event.target.value)
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        if (comment.trim() != "") {
            await post("/new", {
                rating: rating,
                comment: comment.trim(),
                orderItemId: orderItemID,
            })
        } else {
            await post("/new", {
                rating: rating,
                orderItemId: orderItemID,
            })
        }

        if (response.ok) {
            setComment("")
            setRating(3)
            setOrderItemID("")
            setSuccessNotification(true)
        } else {
            setErrorNotification(true)
        }
        mutate()
    }

    if (error) return <ErrorLeaveAReviewForm />

    return (
        <form style={{ height: "100%" }} onSubmit={handleFormSubmit}>
            <SnackbarHandler
                isSuccess={successNotification}
                isError={errorNotification}
                successMessage="Review submitted successfully."
                errorMessage="An error occurred while submitting the review."
                onSuccessClose={() => setSuccessNotification(false)}
                onErrorClose={() => setErrorNotification(false)}
            />
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box display="flex" height="100%" flexDirection="column" justifyContent="space-between">
                <Box>
                    <LeaveAReviewHeader />
                    <LeaveAReviewFields
                        orderItemID={orderItemID}
                        rating={rating}
                        comment={comment}
                        handleOrderOnChange={handleOrderOnChange}
                        handleRatingOnChange={handleRatingOnChange}
                        handleTextFieldOnChange={handleTextFieldOnChange}
                        handleTextFieldOnBlur={handleTextFieldOnBlur}
                        formValidationError={formValidationError}
                        formValidationErrorMessage={formValidationErrorMessage}
                        unreviewedOrderItems={data}
                    />
                </Box>
                <SubmitReviewButton formValidationError={formValidationError} orderIsSelected={orderItemID} />
            </Box>
        </form>
    )
}

export default LeaveAReviewForm
