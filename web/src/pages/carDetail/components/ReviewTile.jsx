import { Rating, Typography, Box, ListItem, ListItemText } from "@mui/material"
import { StarOutlineSharp, StarSharp } from "@mui/icons-material"

import date from "date-and-time"
import ReadMore from "./ReadMore"

const pattern = date.compile("MMM D, YYYY")

function ReviewTile({ key, rating, comment, createdDate, isApproved }) {
    return (
        <ListItem alignItems="flex-start" key={key}>
            <ListItemText
                sx={{ paddingLeft: 1, paddingRight: 1 }}
                disableTypography
                primary={
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
                }
                secondary={
                    comment != null ? (
                        <Box paddingTop={1}>
                            <ReadMore isApproved={isApproved}>{comment}</ReadMore>
                        </Box>
                    ) : null
                }
            />
        </ListItem>
    )
}

export default ReviewTile
