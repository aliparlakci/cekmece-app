import React from "react"
import StyledSnackbar from "./leaveReview/components/StyledSnackbar"

function SnackbarHandler({ isSuccess, isError, successMessage, errorMessage, onSuccessClose, onErrorClose }) {
    return (
        <>
            <StyledSnackbar
                showSnackbar={isSuccess}
                handleSnackbarClose={onSuccessClose}
                type="success"
                message={successMessage}
            />
            <StyledSnackbar
                showSnackbar={isError}
                handleSnackbarClose={onErrorClose}
                type="error"
                message={errorMessage}
            />
        </>
    )
}

export default SnackbarHandler
