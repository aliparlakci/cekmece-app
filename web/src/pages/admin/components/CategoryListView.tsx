import React, { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { Box, Button, CssBaseline } from "@mui/material"
import useSWR from "swr"

import NewCategoryDialog from "./NewCategoryDialog"
import fetcher from "../../../utils/fetcher"
import ICategory from "../../../models/category"

const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1 },
]

export default function CategoryListView() {
    const { data, error } = useSWR<ICategory[]>("/api/categories", fetcher)

    const [isNewCategoryDialogOpen, setNewCategoryDialogOpen] = useState(false)
    const [selected, setSelected] = useState<any[]>([])

    useEffect(() => console.log(selected), [selected])

    if (!data) return <></>

    return (
        <>
            <NewCategoryDialog open={isNewCategoryDialogOpen} onClose={() => setNewCategoryDialogOpen(false)} />
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
                            <Button variant="contained">
                                <span className="whitespace-nowrap" onClick={() => setNewCategoryDialogOpen(true)}>New Category</span>
                            </Button>
                        </Box>
                        <div className="w-full h-full bg-white rounded-lg">
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
        </>
    )
}
