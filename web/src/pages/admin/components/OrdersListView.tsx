import React, { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { Box, Button, CssBaseline } from "@mui/material"
import useSWR, { mutate } from "swr"

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

const columns = [
    { field: "id", headerName: "ID", flex: 1},
    { field: "carId", headerName: "Car ID"},
    { field: "userId", headerName: "Customer ID", flex: 1},
    { field: "name", headerName: "Name" },
    { field: "price", headerName: "Price" },
    { field: "quantity", headerName: "Quantity" },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "status", headerName: "Status" },
    { field: "puchasedAt", headerName: "Purchased At" },
    { field: "updatedAt", headerName: "Last Updated" },
]

export default function OrdersListView() {
    const { data, error } = useSWR<IOrder[]>("/api/orders/all", fetcher)

    const [selected, setSelected] = useState<any[]>([])
    const [isOrderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false)
    const [orderId, setOrderId] = useState<number | undefined>(undefined)
    const [orderItems, setOrderItems] = useState<any[]>([])

    useEffect(() => {
        if (data)
            setOrderItems(data.map(order => order.orderItems.map(item => {
                return {
                    id: item.id,
                    orderId: item.order.id,
                    carId: item.car.id,
                    userId: item.order.user.id,
                    puchasedAt: (new Date(item.order.createdDate)).toLocaleDateString(),
                    updatedAt: (new Date(item.order.updatedDate)).toLocaleDateString(),
                    price: item.total,
                    quantity: item.quantity,
                    address: order.addressLine1,
                    status: item.order.status,
                    name: item.car.name
                }
            })).flat())
    }, [data])

    const handleClose = () => {
        setOrderDetailsModalOpen(false)
        setOrderId(undefined)
    }

    const onOrderDetails = (id: number) => {
        setOrderId(id)
        window.open(`http://localhost:5001/api/orders/invoice/${id}`,'_newtab');
    }

    if (!data) return <></>

    return (
        <>
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
                            sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}
                            paddingY={2}
                        >
                            <Links />
                            <div></div>
                        </Box>
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
        </>
    )
}
