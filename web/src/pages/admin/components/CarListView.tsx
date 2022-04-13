import React, { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { Box, Button, CssBaseline } from "@mui/material"
import useSWR from "swr"

import NewCarDialog from "./NewCarDialog"
import ICar from "../../../models/car"
import fetcher from "../../../utils/fetcher"

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

    const [selected, setSelected] = useState<any[]>([])
    const [isNewCarModalOpen, setNewCarModalOpen] = useState(false)
    const [update, setUpdate] = useState<number|undefined>(undefined)

    const handleClose = () => {
        setNewCarModalOpen(false)
        setUpdate(undefined)
    }

    const onCarEdit = (id: number) => {
        setUpdate(id)
        setNewCarModalOpen(true)
    }

    if (!data) return <></>

    return (
        <>
            <NewCarDialog open={isNewCarModalOpen} onClose={handleClose} update={update} />
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
                <CssBaseline />
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Box
                        component="main"
                        sx={{
                            flex: 1,
                            py: 6,
                            px: 4,
                            bgcolor: "#eaeff1",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "end",
                        }}
                        className="h-full"
                    >
                        <Box
                            sx={{ width: "min-content", display: "flex", flexDirection: "row", gap: "1rem" }}
                            paddingY={2}
                        >
                            {selected.length > 0 && (
                                <Button variant="contained" color="error">
                                    <span className="whitespace-nowrap">Delete Car(s)</span>
                                </Button>
                            )}
                            <Button variant="contained" onClick={() => setNewCarModalOpen(true)}>
                                <span className="whitespace-nowrap">New Car</span>
                            </Button>
                        </Box>
                        <div className="w-full h-full bg-white rounded-lg">
                            <DataGrid
                                rows={mapData(data || [])}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                onSelectionModelChange={(model, details) => setSelected(model)}
                                checkboxSelection
                                disableSelectionOnClick
                                onCellDoubleClick={(params) => onCarEdit(params.row.id)}
                            />
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
