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
import SetDiscountsDialog from "./SetDiscountsDialog"
import Links from "./Links"

const columns = [
    { field: "id", headerName: "ID" },
    { field: "distributor", headerName: "Brand", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "price", headerName: "Price" },
    { field: "discount", headerName: "Discount" },
    { field: "total", headerName: "Total" },
]

const mapData = (data: ICar[]) =>
    data.map((car) => ({
        ...car,
        distributor: car.distributor?.name,
        category: car.category?.name,
        total: car.price * (100 - car.discount) / 100
    }))

export default function DiscountsListView() {
    const { data, error } = useSWR<ICar[]>("/api/cars", fetcher)

    const confirm = useConfirmation()
    const notification = useNotification()

    const [selected, setSelected] = useState<any[]>([])
    const [isDiscountModalOpen, setIsDiscountModalOpenOpen] = useState(false)
    const [update, setUpdate] = useState<number | undefined>(undefined)

    const handleClose = () => {
        setIsDiscountModalOpenOpen(false)
        setUpdate(undefined)
    }

    const onDoubleClick = (id: number) => {
        setUpdate(id)
        setIsDiscountModalOpenOpen(true)
    }

    if (!data) return <></>

    return (
        <>
            <SetDiscountsDialog open={isDiscountModalOpen} onClose={handleClose} update={update} />
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
                        </Box>
                        <div className="w-full h-full bg-white rounded-lg">
                            <DataGrid
                                rows={mapData(data || [])}
                                columns={columns}
                                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                onSelectionModelChange={(model, details) => setSelected(model)}
                                onCellDoubleClick={(params) => onDoubleClick(params.row.id)}
                            />
                        </div>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
