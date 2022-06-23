import React from "react"
import NavBar from "../../components/NavBar"
import { Box, Button, createTheme, ThemeProvider, Typography, Paper } from "@mui/material"
import OrderSection from "./components/OrderSection"
import useSWR from "swr"
import fetcher from "../../utils/fetcher"
import IOrder from "../../models/order"

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})

export default function OrdersPage() {
    const { data, mutate, error } = useSWR<IOrder[]>(`/api/orders`, fetcher)

    if (error)
        return (
            <ThemeProvider theme={theme}>
            </ThemeProvider>
        )

    if (!data)
        return (
            <ThemeProvider theme={theme}>
            </ThemeProvider>
        )

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className="flex flex-row justify-center mt-20">
                    <div className="max-w-screen-lg flex-nowrap">
                        <Typography variant="h3" sx={{ fontWeight: "light" }}>
                            My Orders
                        </Typography>
                        <Paper elevation={0} sx={{ borderRadius: 0 }} className="max-w-screen-lg mt-10 mb-2 px-16">
                            <Box className="grid grid-cols-6 gap-6">
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: "light" }}>
                                        Order ID
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: "light" }}>
                                        Cars
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: "light" }}>
                                        Ordered On
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: "light" }}>
                                        Total
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: "light" }}>
                                        Status
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                        {data.map((order) => {
                            return <OrderSection order={order} />
                        })}
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}
