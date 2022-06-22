import React, { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { Box, Button, CssBaseline, Typography } from "@mui/material"
import useSWR, { mutate } from "swr"
import Grid from "@mui/material/Grid"
import { Paper } from "@material-ui/core"

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import TextField from "@mui/material/TextField"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

import NewCarDialog from "./NewCarDialog"
import ICar from "../../../models/car"
import fetcher from "../../../utils/fetcher"
import useConfirmation from "../../../hooks/useConfirmation"
import useNotification, { NOTIFICATON_TYPES } from "../../../hooks/useNotification"
import { Link } from "react-router-dom"
import IOrder from "../../../models/order"
import OrderDetailsModal from "./OrderDetailsModal"
import IOrderItem from "../../../models/orderItem"
import Links from "./Links"
import SetDiscountsDialog from "./SetDiscountsDialog"
import SetDeliveryDialog from "./SetDeliveryDialog"

const columns = [
    { field: "id", headerName: "ID" },
    { field: "carId", headerName: "Car ID" },
    { field: "name", headerName: "Name" },
    { field: "price", headerName: "Price" },
    { field: "quantity", headerName: "Quantity" },
    { field: "status", headerName: "Status" },
    { field: "puchasedAt", headerName: "Purchased At" },
]

export default function SalesListView() {
    const { data, error } = useSWR<IOrder[]>("/api/orders/all", fetcher)

    const [selected, setSelected] = useState<any[]>([])
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [startDateValue, setStartDateValue] = React.useState<Date | null>(new Date("2021-08-18T21:11:54"))
    const [endDateValue, setEndDateValue] = React.useState<Date | null>(new Date("2022-08-18T21:11:54"))

    const [isDeliveryDialogOpen, setIsDeliveryDialogOpen] = useState(false)
    const [orderId, setOrderId] = useState<number | undefined>(undefined)
    const [orderItemId, setOrderItemId] = useState<any>()
    const [orderItems, setOrderItems] = useState<any[]>([])

    useEffect(() => {
        if (data)
            setOrderItems(
                data
                    .map((order) =>
                        order.orderItems.map((item) => {
                            setTotalRevenue(totalRevenue + item.total)
                            return {
                                id: item.id,
                                orderId: item.order.id,
                                carId: item.car.id,
                                puchasedAt: new Date(item.order.createdDate).toLocaleDateString(),
                                price: item.total,
                                quantity: item.quantity,
                                status: item.status,
                                name: item.car.name,
                            }
                        })
                    )
                    .flat()
            )
    }, [data])

    const handleStartDateChange = (newValue: Date | null) => {
        setStartDateValue(newValue)
    }
    const handleEndDateChange = (newValue: Date | null) => {
        setEndDateValue(newValue)
    }

    const handleFilterButton = () => {
        event?.preventDefault()
        if (data) {
            //setOrderItems([])
            const filteredOrders = data.filter((order) => {
                const orderDate = new Date(order.createdDate)
                return orderDate >= startDateValue! && orderDate <= endDateValue!
            })
            console.log(filteredOrders)
            let rev = 0
            setOrderItems(
                filteredOrders
                    .map((order) =>
                        order.orderItems.map((item) => {
                            rev = rev + item.total
                            return {
                                id: item.id,
                                orderId: item.order.id,
                                carId: item.car.id,
                                puchasedAt: new Date(item.order.createdDate).toLocaleDateString(),
                                price: item.total,
                                quantity: item.quantity,
                                status: item.status,
                                name: item.car.name,
                            }
                        })
                    )
                    .flat()
            )

            setTotalRevenue(rev)
        }
    }

    const onOrderDetails = (id: number) => {
        setOrderId(id)
        window.open(`http://localhost:5001/api/orders/invoice/${id}`, "_newtab")
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: "flex", minHeight: "calc(100vh - 4rem)" }}>
                <CssBaseline />
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Box
                        component="main"
                        sx={{
                            flex: 1,
                            px: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "end",
                        }}
                        className="h-full"
                    >
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                            paddingY={2}
                        >
                            <Links />
                        </Box>

                        <Grid container spacing={2} sx={{ pt: 0, px: 5 }}>
                            <Grid item md={6} xs={6} sx={{ py: 2, px: 5 }}>
                                <Paper variant="outlined">
                                    <Box sx={{ height: 150, p: 2, alignItems: "center", justifyContent: "center" }}>
                                        <DesktopDatePicker
                                            label="Start date"
                                            inputFormat="MM/dd/yyyy"
                                            value={startDateValue}
                                            onChange={handleStartDateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        <DesktopDatePicker
                                            label="End date"
                                            inputFormat="MM/dd/yyyy"
                                            value={endDateValue}
                                            onChange={handleEndDateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        <Button onClick={handleFilterButton}>Filter</Button>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item md={6} xs={6} sx={{ py: 2, px: 5 }} alignItems="center" justifyContent="center">
                                <Paper variant="outlined">
                                    <Box sx={{ height: 150, justifyContent: "center" }}>
                                        <Typography variant="h4" component="div" gutterBottom sx={{ align: "center" }}>
                                            Total Revenue
                                        </Typography>
                                        <Typography variant="h3" component="div" gutterBottom sx={{ align: "center" }}>
                                            ${totalRevenue}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                        <div className="w-full h-full bg-white rounded-lg">
                            <DataGrid
                                rows={orderItems || []}
                                columns={columns}
                                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                onSelectionModelChange={(model, details) => setSelected(model)}
                                onCellDoubleClick={(params) => onOrderDetails(params.row.orderId)}
                            />
                        </div>
                    </Box>
                </Box>
            </Box>
        </LocalizationProvider>
    )
}
