import React, { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { Box, CssBaseline } from "@mui/material"
import useSWR from "swr"

import fetcher from "../../../utils/fetcher"
import ICategory from "../../../models/category"

const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1 },
]

export default function CategoryListView() {
    const { data, error } = useSWR<ICategory[]>("/api/categories", fetcher)

    const [selected, setSelected] = useState<any[]>([])

    useEffect(() => console.log(selected), [selected])

    if (!data) return <></>

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <CssBaseline />
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }} className="h-full">
                    <div className="w-full h-full bg-white rounded-lg">
                        "Hello World -Eylül"
                        <DataGrid
                            rows={data || []}
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
