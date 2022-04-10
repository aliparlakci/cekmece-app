import React from "react"
import { Box, Typography } from "@mui/material"
import { Inbox } from "@mui/icons-material"

function NoReviewsView() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
            alignItems="center"
            height="100vh"
        >
            <Inbox sx={{ color: "black", fontSize: 34 }} />
            <Typography variant="body2" sx={{ paddingTop: 1, paddingBottom: 9, fontWeight: 700 }}>
                There are no customer reviews for this item.
            </Typography>
        </Box>
    )
}

export default NoReviewsView
