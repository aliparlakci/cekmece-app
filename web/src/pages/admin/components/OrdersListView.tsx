import React, { useState } from "react"
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

const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "discount", headerName: "Discount" },
    { field: "total", headerName: "Amount" },
    { field: "createdDate", headerName: "Created At", flex: 1 },
    { field: "updatedDate", headerName: "Last Updated", flex: 1 },
]

export default function OrdersListView() {
    const { data, error } = useSWR<IOrder[]>("/api/orders/all", fetcher)

    const confirm = useConfirmation()
    const notification = useNotification()

    const [selected, setSelected] = useState<any[]>([])
    const [isNewCarModalOpen, setNewCarModalOpen] = useState(false)
    const [update, setUpdate] = useState<number | undefined>(undefined)

    const handleClose = () => {
        setNewCarModalOpen(false)
        setUpdate(undefined)
    }

    const onCarEdit = (id: number) => {
        setUpdate(id)
        setNewCarModalOpen(true)
    }
    //
    // const onDelete = (id: number) => {
    //     confirm({
    //         title: "Do you want to delete the car?",
    //         message: "",
    //     }, async () => {
    //         try {
    //             const response = await fetch(`/api/cars/${id}/delete`, {
    //                 method: "POST",
    //             })
    //
    //             if (response.status !== 200) {
    //                 throw `Couldn't delete the car, server responded with ${response.status}`
    //             }
    //
    //             mutate("/api/cars")
    //         } catch (err) {
    //             notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(err))
    //         }
    //     })
    // }

    if (!data) return <></>

    return (
        <>
            <NewCarDialog open={isNewCarModalOpen} onClose={handleClose} update={update} />
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
                                rows={data || []}
                                columns={columns}
                                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                onSelectionModelChange={(model, details) => setSelected(model)}
                                onCellDoubleClick={(params) => onCarEdit(params.row.id)}
                            />
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
