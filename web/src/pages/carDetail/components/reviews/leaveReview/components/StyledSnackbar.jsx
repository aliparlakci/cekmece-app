import { Snackbar, Alert } from "@mui/material"

function StyledSnackbar({ showSnackbar, handleSnackbarClose, type, message }) {
    return (
        <Snackbar
            open={showSnackbar}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert onClose={handleSnackbarClose} severity={type} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default StyledSnackbar
