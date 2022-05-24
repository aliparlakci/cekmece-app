import React, { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { Box, Button, CssBaseline } from "@mui/material"
import useSWR from "swr"

import NewDistributorDialog from "./NewDistributorDialog"
import IDistributor from "../../../models/distributor"
import fetcher from "../../../utils/fetcher"
import { Link } from "react-router-dom"

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
                                <Link to="/admin/reviews"><Button variant="text">Reviews</Button></Link>
                            </div>
                            <div>
                                <Button variant="contained">
                                    <span className="whitespace-nowrap" onClick={() => setNewDistributorDialogOpen(true)}>New Distributor</span>
                                </Button>
                            </div>
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
