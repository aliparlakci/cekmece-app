import { Box, Button } from "@mui/material"

function SubmitReviewButton({ formValidationError }) {
    return (
        <Box
            sx={{
                mt: 2,
                padding: 1,
            }}
        >
            <Button
                type="submit"
                variant="contained"
                disableElevation
                disabled={formValidationError}
                sx={{
                    width: "100%",
                    fontWeight: 700,
                    color: "white",
                    padding: 2,
                    backgroundColor: "black",
                    ":hover": {
                        backgroundColor: "#2D2D2D",
                    },
                    ":disabled": {
                        color: "white",
                        backgroundColor: "#515151",
                    },
                }}
            >
                SUBMIT REVIEW
            </Button>
        </Box>
    )
}

export default SubmitReviewButton
