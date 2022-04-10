import { Rating, Box, Drawer, Button } from "@mui/material"
import { StarOutlineSharp, StarSharp } from "@mui/icons-material"

function LeaveAReviewButton({ carId }) {
    return (
        <div>
            <Box display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    onClick={() => {
                        return
                    }}
                    disableElevation
                    sx={{
                        minWidth: 250,
                        fontWeight: 700,
                        color: "white",
                        backgroundColor: "black",
                        ":hover": {
                            backgroundColor: "#2D2D2D",
                        },
                    }}
                >
                    LEAVE A REVIEW
                </Button>
            </Box>
        </div>
    )
}

export default LeaveAReviewButton
