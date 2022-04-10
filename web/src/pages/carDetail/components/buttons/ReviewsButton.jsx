import { useState } from "react"
import { Rating, Box, Drawer, Button } from "@mui/material"
import { StarOutlineSharp, StarSharp } from "@mui/icons-material"
import ReviewList from "../reviews/ReviewList"

function ReviewsButton({ carId, averageRating, reviewCount }) {
    const [isReviewsDrawerOpen, setIsReviewsDrawerOpen] = useState(false)

    const toggleReviewsDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return
        }

        setIsReviewsDrawerOpen(open)
    }

    return (
        <div>
            <Box display="flex" justifyContent="center" textAlign="center" alignItems="center">
                <Button onClick={toggleReviewsDrawer(true)} sx={{ minWidth: 250, fontWeight: 700, color: "black" }}>
                    REVIEWS ({reviewCount})
                    <Rating
                        name="read-only"
                        precision={0.5}
                        value={averageRating}
                        emptyIcon={<StarOutlineSharp sx={{ color: "black", fontSize: 18 }} />}
                        icon={<StarSharp sx={{ color: "black", fontSize: 18 }} />}
                        sx={{ paddingLeft: 2 }}
                        readOnly
                    />
                </Button>
            </Box>
            <Drawer
                PaperProps={{
                    sx: {
                        width: {
                            xs: 300,
                            sm: 400,
                            md: 500,
                        },
                    },
                }}
                anchor="right"
                open={isReviewsDrawerOpen}
                onClose={toggleReviewsDrawer(false)}
            >
                <Box role="presentation" onKeyDown={toggleReviewsDrawer(false)}>
                    <ReviewList carId={carId}></ReviewList>
                </Box>
            </Drawer>
        </div>
    )
}

export default ReviewsButton
