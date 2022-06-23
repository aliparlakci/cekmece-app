import React, { useState } from "react"
import { Box, Button, createTheme, Paper, ThemeProvider, Typography } from "@mui/material"
import IOrder from "../../../models/order"
import date from "date-and-time"
import { ItemOrderStatus } from "../../../models/orderItem"
import useNotification, { NOTIFICATON_TYPES } from "../../../hooks/useNotification"
import { mutate } from "swr"

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})

const pattern = date.compile("MMM D, YYYY")

export default function OrderSection({ order }: { order: IOrder }) {
    const [loading, setLoading] = useState(false)
    const notification = useNotification()

    const handleRefund = async (orderItemId) => {
        try {
            setLoading(true)
            const response = await fetch(`/api/orders/newRefund/${orderItemId}`, { method: "POST" })
            if (response.status !== 201) throw `Something went wrong`

            notification(NOTIFICATON_TYPES.SUCCESS, "Refund request is successfully sent!")
        } catch (e) {
            notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(e))
        } finally {
            setLoading(false)
            mutate("/api/orders")
        }
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                {order.orderItems.map((orderItem) =>
                    <div className="max-w-screen-lg py-5 px-16 mb-10 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
                        <Paper elevation={0} sx={{ borderRadius: 0 }}>
                            <Box className="grid grid-cols-6 gap-6">
                                <Box>
                                    <Typography sx={{ color: "#AAAAAA" }}>#{order.id}</Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{}}>
                                        {`${orderItem.car.model} ${orderItem.car.distributor?.name} ${orderItem.car.name} (x${orderItem.quantity})`}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{}}>{date.format(new Date(order.createdDate), pattern)}</Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{}}>${orderItem.total}</Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{}}>
                                        {(() => {
                                            if (orderItem.refund && (!orderItem.refund.isApproved && !orderItem.refund.isRejected)) {
                                                return "REFUND REQUESTED"
                                            } else {
                                                return orderItem.status.toUpperCase()
                                            }
                                        })()}
                                    </Typography>
                                </Box>
                                <Box sx={{}}>
                                    {(() => {
                                        const today = new Date()
                                        const createdDate = new Date(order.createdDate)
                                        const days = (today.getTime() - createdDate.getTime()) / (1000 * 3600 * 24)
                                        if (days > 30) {
                                            return <></>
                                        }

                                        if (orderItem.refund) return <></>

                                        if (orderItem.status !== ItemOrderStatus.CANCELLED && orderItem.status !== ItemOrderStatus.RETURNED) {
                                            return <Button disabled={loading} variant="outlined" color="error" onClick={() => handleRefund(orderItem.id)}>
                                                {orderItem.status === ItemOrderStatus.DELIVERED && "Return"}
                                                {(orderItem.status === ItemOrderStatus.INTRANSIT || orderItem.status === ItemOrderStatus.PROCESSING) && "Cancel"}
                                            </Button>
                                        }
                                    })()}
                                </Box>
                            </Box>
                        </Paper>
                    </div>
                )}
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
