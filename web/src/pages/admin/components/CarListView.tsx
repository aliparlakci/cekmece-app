import React, { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { Box, CssBaseline } from "@mui/material"
import useSWR from "swr"

import ICar from "../../../models/car"
import fetcher from "../../../utils/fetcher"

const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "model", headerName: "Model", flex: 1 },
    { field: "distributor", headerName: "Brand", flex: 1 },
    { field: "number", headerName: "Number", flex: 1 },
    { field: "warranty", headerName: "Warranty", flex: 1 },
    { field: "quantity", headerName: "Stocks" },
    { field: "price", headerName: "Price" },
    { field: "category", headerName: "Category", flex: 1 },
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

    useEffect(() => console.log(selected), [selected])

    if (!data) return <></>

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <CssBaseline />
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }} className="h-full">
                    <div className="w-full h-full bg-white rounded-lg">
                        <DataGrid
                            rows={mapData(data || [])}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            onSelectionModelChange={(model, details) => setSelected(model)}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>
                </Box>
            </Box>
        </Box>
    )
}
