import React, { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { Box, Button, CssBaseline } from "@mui/material"
import useSWR, { mutate } from "swr"

import NewCategoryDialog from "./NewCategoryDialog"
import fetcher from "../../../utils/fetcher"
import ICategory from "../../../models/category"
import { Link } from "react-router-dom"
import useNotification, { NOTIFICATON_TYPES } from "../../../hooks/useNotification"
import useConfirmation from "../../../hooks/useConfirmation"
import Links from "./Links"

const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1 },
]

export default function CategoryListView() {
    const { data, error } = useSWR<ICategory[]>("/api/categories", fetcher)

    const confirm = useConfirmation()
    const notification = useNotification()

    const [isNewCategoryDialogOpen, setNewCategoryDialogOpen] = useState(false)
    const [selected, setSelected] = useState<any[]>([])
    const [update, setUpdate] = useState<number | undefined>(undefined)

    const handleClose = () => {
        setUpdate(undefined)
        setNewCategoryDialogOpen(false)
    }

    const onCategoryEdit = (id: number) => {
        setUpdate(id)
        setNewCategoryDialogOpen(true)
    }

    const onDelete = (id: number) => {
        confirm({
            title: "Do you want to delete the category?",
            message: "",
        }, async () => {
            try {
                const response = await fetch(`/api/categories/${id}/delete`, {
                    method: "POST",
                })

                if (response.status !== 200) {
                    throw `Couldn't delete the car, server responded with ${response.status}`
                }

                mutate("/api/categories")
            } catch (err) {
                notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(err))
            }
        })
    }

    if (!data) return <></>

    return (
        <>
            <NewCategoryDialog open={isNewCategoryDialogOpen} onClose={handleClose}
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
                            <Links />
                            <div>
                                {selected.length > 0 && (
                                    <Button variant="contained" color="error">
                                        <span className="whitespace-nowrap" onClick={() => onDelete(selected[0])}>Delete Category</span>
                                    </Button>
                                )}
                                <Button variant="contained">
                                    <span className="whitespace-nowrap" onClick={() => setNewCategoryDialogOpen(true)}>New Category</span>
                                </Button>
                            </div>
                        </Box>
                        <div className="w-full h-full bg-white rounded-lg">
                            <DataGrid
                                rows={data || []}
                                columns={columns}
                                pageSize={25}
                                rowsPerPageOptions={[5,10,25,50,100]}
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
