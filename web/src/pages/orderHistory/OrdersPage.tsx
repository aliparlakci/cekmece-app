import React from "react"
import NavBar from "../../components/NavBar"
import { Box, Button, createTheme, ThemeProvider, Typography } from "@mui/material"


const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})


export default function OrdersPage() {
    return (
        <>
            <ThemeProvider theme={theme}>
               zort
            </ThemeProvider>
        </>
    )
}
