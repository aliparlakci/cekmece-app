import { IconButton, Rating, Typography, Box, ListItem, ListItemText } from "@mui/material"
import { StarOutlineSharp, StarSharp } from "@mui/icons-material"
import date from "date-and-time"
import ReadMore from "./ReadMore"
import { DeleteForever } from "@mui/icons-material"
import { mutate } from "swr"
import useNotification, { NOTIFICATON_TYPES } from "../../../../../../hooks/useNotification"

const pattern = date.compile("MMM D, YYYY")

function ReviewItem({ key, reviewId, carId, rating, comment, createdDate, isApproved, isYourReview, del, response }) {
    const notification = useNotification()

    const handleOnClick = async (event) => {
        event.preventDefault()

        await del(`/${reviewId}`)

        if (response.ok) {
            notification(NOTIFICATON_TYPES.SUCCESS, "Review deleted successfully.")
        } else {
            notification(NOTIFICATON_TYPES.ERROR, "An error occured while deleting review.")
        }

        mutate(`/api/cars/${carId}/reviews`)
        mutate(`/api/cars/${carId}`)
    }

    return (
        <>
            <ListItem alignItems="flex-start" key={key}>
                <ListItemText
                    sx={{ paddingLeft: 1, paddingRight: 1, margin: !isYourReview ? "default" : 0 }}
                    disableTypography
                    primary={
                        <Box display="flex" sx={{ justifyContent: "space-between" }}>
                            <Box display="flex" alignItems="center">
                                <Rating
                                    name="read-only"
                                    value={rating}
                                    emptyIcon={<StarOutlineSharp sx={{ color: "black", fontSize: 18 }} />}
                                    icon={<StarSharp sx={{ color: "black", fontSize: 18 }} />}
                                    sx={{ paddingRight: 2 }}
                                    readOnly
                                />
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    {date.format(new Date(createdDate), pattern)}
                                </Typography>
                            </Box>
                            {isYourReview && (
                                <IconButton onClick={handleOnClick}>
                                    <DeleteForever
                                        sx={{
                                            minWidth: 0,
                                            minHeight: 0,
                                            padding: 0,
                                            margin: 0,
                                            color: "black",
                                            fontSize: 18,
                                        }}
                                    />
                                </IconButton>
                            )}
                        </Box>
                    }
                    secondary={
                        comment != null ? (
                            <Box paddingTop={!isYourReview ? 1 : 0}>
                                <ReadMore isApproved={isApproved}>{comment}</ReadMore>
                            </Box>
                        ) : null
                    }
                />
            </ListItem>
        </>
    )
}

export default ReviewItem
