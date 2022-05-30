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

const columns = [
    { field: "id", headerName: "ID" },
    { field: "model", headerName: "Model" },
    { field: "distributor", headerName: "Brand", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "number", headerName: "Number" },
    { field: "warranty", headerName: "Warranty" },
    { field: "quantity", headerName: "Stocks" },
    { field: "price", headerName: "Price" },
]

const mapData = (data: ICar[]) =>
    data.map((car) => ({
        ...car,
        distributor: car.distributor?.name,
        category: car.category?.name,
    }))

export default function CarListView() {
    const { data, error } = useSWR<ICar[]>("/api/cars", fetcher)

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

    const onDelete = (id: number) => {
        confirm({
            title: "Do you want to delete the car?",
            message: "",
        }, async () => {
            try {
                const response = await fetch(`/api/cars/${id}/delete`, {
                    method: "POST",
                })

                if (response.status !== 200) {
                    throw `Couldn't delete the car, server responded with ${response.status}`
                }

                mutate("/api/cars")
            } catch (err) {
                notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(err))
            }
        })
    }

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
                            <div>
                                {selected.length > 0 && (
                                    <Button variant="contained" color="error">
                                        <span className="whitespace-nowrap" onClick={() => onDelete(selected[0])}>Delete Car</span>
                                    </Button>
                                )}
                                <Button variant="contained" onClick={() => setNewCarModalOpen(true)}>
                                    <span className="whitespace-nowrap">New Car</span>
                                </Button>
                            </div>
                        </Box>
                        <div className="w-full h-full bg-white rounded-lg">
                            <DataGrid
                                rows={mapData(data || [])}
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
