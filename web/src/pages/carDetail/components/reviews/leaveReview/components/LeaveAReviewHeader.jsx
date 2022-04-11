import { Box, Typography } from "@mui/material"

function LeaveAReviewHeader() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            textAlign="center"
            alignItems="center"
            sx={{
                padding: 3,
                backgroundColor: "#F6F6F6",
                width: "100%",
            }}
        >
            <Typography variant="h6" sx={{ display: "inline", fontWeight: 700 }} component="span">
                NEW
            </Typography>
            <Typography variant="h6" sx={{ paddingLeft: 1, fontWeight: 400 }} component="span">
                REVIEW
            </Typography>
        </Box>
    )
}

export default LeaveAReviewHeader
