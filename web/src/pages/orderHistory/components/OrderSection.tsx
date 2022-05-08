import React from "react"
import { Box, Button, Paper, createTheme, ThemeProvider, Typography } from "@mui/material"
import IOrder from "../../../models/order"
import date from "date-and-time"

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})

const pattern = date.compile("MMM D, YYYY")

export default function OrderSection({ order }: { order: IOrder }) {
    return (
        <>
            <ThemeProvider theme={theme}>
                <div className="max-w-screen-lg py-5 px-16 mb-10 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
                    <Paper elevation={0} sx={{ borderRadius: 0 }}>
                        <Box className="grid grid-cols-6 gap-6">
                            <Box>
                                <Typography sx={{ color: "#AAAAAA" }}>#{order.id}</Typography>
                            </Box>
                            <Box>
                                <Typography sx={{}}>
                                    {order.orderItems.map((orderItem) => {
                                        return `${orderItem.car.model} ${orderItem.car.distributor?.name} ${orderItem.car.name} - x${orderItem.quantity}`
                                    })}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography sx={{}}>{date.format(new Date(order.createdDate), pattern)}</Typography>
                            </Box>
                            <Box>
                                <Typography sx={{}}>{order.addressLine1}</Typography>
                                {order.addressLine2 && <Typography sx={{}}>{order.addressLine2}</Typography>}
                                <Typography sx={{}}>
                                    {order.city}/{order.country}
                                </Typography>
                                <Typography sx={{}}>{order.zipCode}</Typography>
                            </Box>
                            <Box>
                                <Typography sx={{}}>${order.total}</Typography>
                            </Box>
                            <Box>
                                <Typography sx={{}}>{order.status.toUpperCase()}</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </div>
            </ThemeProvider>
        </>
    )
}

/*
  <Box className="flex flex-row">
                                <Typography sx={{ color: "#ffc107" }}>Return&emsp;</Typography>
                                <Typography sx={{ color: "#AAAAAA" }} className="m-4">
                                    |
                                </Typography>
                                <Typography sx={{ color: "#f44336" }}>&emsp;Cancel</Typography>
                            </Box>
                            */
