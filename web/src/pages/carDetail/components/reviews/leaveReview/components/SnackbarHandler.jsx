import { Fragment, useState, useEffect } from "react"
import StyledSnackbar from "./StyledSnackbar"

function SnackbarHandler({ data, error }) {
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false)
    const [showErrorSnackbar, setShowErrorSnackbar] = useState(false)

    useEffect(() => {
        setShowErrorSnackbar(true)
    }, [error])

    useEffect(() => {
        setShowSuccessSnackbar(true)
    }, [data])

    const handleSuccessSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return
        }

        setShowSuccessSnackbar(false)
    }

    const handleErrorSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return
        }

        setShowErrorSnackbar(false)
    }

    return (
        <Fragment>
            {data && (
                <StyledSnackbar
                    showSnackbar={showSuccessSnackbar}
                    handleSnackbarClose={handleSuccessSnackbarClose}
                    type="success"
                    message="Review submitted successfully."
                />
            )}
            {error && (
                <StyledSnackbar
                    showSnackbar={showErrorSnackbar}
                    handleSnackbarClose={handleErrorSnackbarClose}
                    type="error"
                    message="An error occurred while submitting the review."
                />
            )}
        </Fragment>
    )
}

export default SnackbarHandler
