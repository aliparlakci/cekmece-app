import React, { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { Box, Button, CssBaseline } from "@mui/material"
import useSWR from "swr"

import NewDistributorDialog from "./NewDistributorDialog"
import IDistributor from "../../../models/distributor"
import fetcher from "../../../utils/fetcher"

const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1 },
]

export default function DistributorListView() {
    const { data, error } = useSWR<IDistributor[]>("/api/distributors", fetcher)

    const [isNewDistributorDialogOpen, setNewDistributorDialogOpen] = useState(false)
    const [selected, setSelected] = useState<any[]>([])
    const [update, setUpdate] = useState<number | undefined>(undefined)

    const handleClose = () => {
        setUpdate(undefined)
        setNewDistributorDialogOpen(false)
    }

    const onCategoryEdit = (id: number) => {
        setUpdate(id)
        setNewDistributorDialogOpen(true)
    }

    if (!data) return <></>

    return (
        <>
            <NewDistributorDialog open={isNewDistributorDialogOpen} onClose={() => setNewDistributorDialogOpen(false)}
                                  update={update} />
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
                                <span className="whitespace-nowrap" onClick={() => setNewDistributorDialogOpen(true)}>New Distributor</span>
                            </Button>
                        </Box>
                        <div className="w-full h-full bg-white rounded-lg">
                            <DataGrid
                                rows={data || []}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                onSelectionModelChange={(model, details) => setSelected(model)}
                                onCellDoubleClick={(params) => onCategoryEdit(params.row.id)}
                            />
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
