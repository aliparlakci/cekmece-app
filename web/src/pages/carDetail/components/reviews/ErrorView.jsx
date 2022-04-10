import React from "react"

import { Box, Typography } from "@mui/material"
import { ErrorOutline, Inbox } from "@mui/icons-material"

function ErrorView() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            textAlign="center"
            alignItems="center"
            height="100vh"
            sx={{
                paddingLeft: 3,
                paddingRight: 3,
            }}
        >
            <ErrorOutline sx={{ color: "black", fontSize: 34 }} />
            <Typography variant="body2" sx={{ paddingTop: 1, paddingBottom: 9, fontWeight: 700 }}>
                An error occurred while getting reviews.\nPlease try again later.
            </Typography>
        </Box>
    )
}

export default ErrorView
