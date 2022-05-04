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
                    variant="text"
                    onClick={toggleCreateReviewDrawer(true)}
                    sx={{
                        minWidth: 250,
                        fontWeight: 700,
                        color: "black",
                        backgroundColor: "white",
                        ":hover": {
                            backgroundColor: "#DDDDDD",
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
