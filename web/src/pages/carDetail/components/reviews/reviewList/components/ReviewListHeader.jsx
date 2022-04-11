import { Fragment } from "react"
import { Box, Typography, Rating } from "@mui/material"
import { StarOutlineSharp, StarSharp } from "@mui/icons-material"
import LinearProgressWithLabel from "./LinearProgressWithLabel"

function ReviewListHeader({ averageRating, reviewCount, reviewRatioByRating }) {
    return (
        <Fragment>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                textAlign="center"
                alignItems="center"
                sx={{
                    paddingLeft: 3,
                    paddingRight: 3,
                    paddingTop: 3,
                    paddingBottom: 2,
                    backgroundColor: "#F6F6F6",
                    width: "100%",
                }}
            >
                <Box display="flex" justifyContent="center" textAlign="center" alignItems="center" sx={{ mb: 0.5 }}>
                    <Typography variant="h6" sx={{ display: "inline", fontWeight: 700 }} component="span">
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
                                    fontSize: 34,
                                }}
                            />
                        }
                        icon={
                            <StarSharp
                                sx={{
                                    color: "black",
                                    fontSize: 34,
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
                <Box sx={{ paddingTop: 3, width: "100%" }}>
                    <LinearProgressWithLabel star={5} value={reviewRatioByRating[5]} />
                    <LinearProgressWithLabel star={4} value={reviewRatioByRating[4]} />
                    <LinearProgressWithLabel star={3} value={reviewRatioByRating[3]} />
                    <LinearProgressWithLabel star={2} value={reviewRatioByRating[2]} />
                    <LinearProgressWithLabel star={1} value={reviewRatioByRating[1]} />
                </Box>
            </Box>
        </Fragment>
    )
}

export default ReviewListHeader
