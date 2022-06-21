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

const columns = [
    { field: "brand", headerName: "Brand", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "total", headerName: "Price" },
    { field: "puchasedAt", headerName: "Purchased At", flex: 1 },
    { field: "updatedAt", headerName: "Last Updated", flex: 1 },
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
                    brand: item.car.distributor?.name,
                    name: item.car.name,
                    puchasedAt: (new Date(item.order.createdDate)).toLocaleDateString(),
                    updatedAt: (new Date(item.order.updatedDate)).toLocaleDateString(),
                    price: item.total,
                    status: item.order.status,
                    ...item
                }
            })).flat())
    }, [data])

    const handleClose = () => {
        setOrderDetailsModalOpen(false)
        setOrderId(undefined)
    }

    const onOrderDetails = (id: number) => {
        setOrderId(id)
        setOrderDetailsModalOpen(true)
    }

    if (!data) return <></>

    return (
        <>
            {/*<OrderDetailsModal open={isOrderDetailsModalOpen} onClose={handleClose} orderId={orderId} />*/}
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
                            <div>
                                <Link to="/admin/cars"><Button variant="text">Cars</Button></Link>
                                <Link to="/admin/categories"><Button variant="text">Categories</Button></Link>
                                <Link to="/admin/distributors"><Button variant="text">Distributors</Button></Link>
                                <Link to="/admin/orders"><Button variant="text">Orders</Button></Link>
                                <Link to="/admin/reviews"><Button variant="text">Reviews</Button></Link>
                            </div>
                            <div></div>
                        </Box>
                        <div className="w-full h-full bg-white rounded-lg">
                            <DataGrid
                                rows={orderItems || []}
                                columns={columns}
                                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                onSelectionModelChange={(model, details) => setSelected(model)}
                                onCellDoubleClick={(params) => onOrderDetails(params.row.id)}
                            />
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
