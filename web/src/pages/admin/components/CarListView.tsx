import React, { useEffect, useState } from "react"
import { DataGrid } from "@mui/x-data-grid"
import useSWR from "swr"

import ICar from "../../../models/car"
import fetcher from "../../../utils/fetcher"

const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "model", headerName: "Model" },
    { field: "distributor", headerName: "Brand" },
    { field: "number", headerName: "Number" },
    { field: "warranty", headerName: "Warranty" },
    { field: "quantity", headerName: "Stocks" },
    { field: "price", headerName: "Price" },
    { field: "categories", headerName: "Categories" },
]

const mapData = (data: ICar[]) =>
    data.map((car) => ({
        ...car,
        distributor: car.distributor.name,
        categories: car.category.name,
    }))

export default function CarListView() {
    const { data, error } = useSWR<ICar[]>("/api/cars", fetcher)

    const [selected, setSelected] = useState<any[]>([])

    useEffect(() => console.log(selected), [selected])

    if (!data) return <></>

    return (
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
    )
}
