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
import SetDiscountsDialog from "./SetDiscountsDialog"
import SetDeliveryDialog from "./SetDeliveryDialog"

const columns = [
    { field: "id", headerName: "ID"},
    { field: "username", headerName: "Customer"},
    { field: "Revenue", headerName: "Price" },
    { field: "address", headerName: "Address" },
    { field: "puchasedAt", headerName: "Purchased At" },
    { field: "updatedAt", headerName: "Last Updated" },
]

export default function InvoicesListView() {
    const { data, error } = useSWR<IOrder[]>("/api/orders/all", fetcher)

    const [selected, setSelected] = useState<any[]>([])
    const [isDeliveryDialogOpen, setIsDeliveryDialogOpen] = useState(false)
    const [orderId, setOrderId] = useState<number | undefined>(undefined)
    const [orderItemId, setOrderItemId] = useState<any>()
    const [orderItems, setOrderItems] = useState<any[]>([])

    useEffect(() => {
        if (data)
            setOrderItems(data.map(order => ({
                id: order.id,
                username: order.user.displayName,
                price: order.total,
                address: order.addressLine1,
                puchasedAt: (new Date(order.createdDate)).toLocaleDateString(),
                updatedAt: (new Date(order.updatedDate)).toLocaleDateString(),
            })))
    }, [data])

    const onOrderDetails = (id: number) => {
        setOrderId(id)
        window.open(`http://localhost:5001/api/orders/invoice/${id}`,'_newtab');
    }

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
                            <div>
                            </div>
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
