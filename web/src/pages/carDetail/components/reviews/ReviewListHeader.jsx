import { Box, Typography, Rating } from "@mui/material"
import { StarOutlineSharp, StarSharp } from "@mui/icons-material"

function ReviewListHeader({ averageRating, reviewCount }) {
    return (
        <Box sx={{ paddingLeft: 3, paddingRight: 3, paddingTop: 4, paddingBottom: 4 }}>
            <Box
                display="flex"
                justifyContent="center"
                textAlign="center"
                alignItems="center"
                sx={{ paddingBottom: 0.5 }}
            >
                <Typography variant="h5" sx={{ display: "inline", fontWeight: 700 }} component="span">
                    {reviewCount}
                </Typography>
                <Typography variant="h6" sx={{ paddingLeft: 2, fontWeight: 500 }} component="span">
                    REVIEWS
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" textAlign="center" alignItems="center">
                <Rating
                    name="read-only"
                    value={averageRating}
                    precision={0.5}
                    emptyIcon={
                        <StarOutlineSharp
                            sx={{
                                color: "black",
                                fontSize: {
                                    xs: 24,
                                    sm: 34,
                                },
                            }}
                        />
                    }
                    icon={
                        <StarSharp
                            sx={{
                                color: "black",
                                fontSize: {
                                    xs: 24,
                                    sm: 34,
                                },
                            }}
                        />
                    }
                    readOnly
                />
                <Typography
                    variant="h5"
                    sx={{
                        paddingLeft: 2,
                        fontWeight: 700,
                    }}
                    component="span"
                >
                    {averageRating.toFixed(1)}
                </Typography>
            </Box>
        </Box>
    )
}

export default ReviewListHeader
