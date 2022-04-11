import { useState } from "react"
import { Box, Drawer, Button } from "@mui/material"
import LeaveAReviewForm from "../reviews/leaveReview/LeaveAReviewForm"

function LeaveAReviewButton({ carId }) {
    const [isCreateReviewDrawerOpen, setIsCreateReviewDrawerOpen] = useState(false)

    const toggleCreateReviewDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return
        }

        setIsCreateReviewDrawerOpen(open)
    }

    return (
        <div>
            <Box display="flex" justifyContent="center">
                <Button
                    variant="contained"
                    onClick={toggleCreateReviewDrawer(true)}
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
            <Drawer
                PaperProps={{
                    sx: {
                        width: {
                            xs: "75%",
                            sm: 400,
                            md: 500,
                        },
                        alignItems: "center",
                    },
                }}
                anchor="right"
                open={isCreateReviewDrawerOpen}
                onClose={toggleCreateReviewDrawer(false)}
            >
                <Box role="presentation" sx={{ width: "100%", height: "100%" }}>
                    <LeaveAReviewForm carId={carId} />
                </Box>
            </Drawer>
        </div>
    )
}

export default LeaveAReviewButton
