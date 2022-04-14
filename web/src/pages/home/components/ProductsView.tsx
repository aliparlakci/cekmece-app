import React from "react"
import { Grid } from "@mui/material"
import ProductCard from "./ProductCard"
import ICar from "../../../models/car"

interface IProductsView {
    cars: ICar[]
}

export default function ProductsView({ cars }) {
    return (
        <>
            <Grid container direction="row" justifyContent="flex-start" alignItems="space-between">
                {cars.map(car => <ProductCard car={car} />)}
            </Grid>
        </>
    )
}
