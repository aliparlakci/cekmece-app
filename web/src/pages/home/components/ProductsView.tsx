import React from "react"
import { Grid } from "@mui/material"
import ProductCard from "./ProductCard"
import ICar from "../../../models/car"

interface IProductsView {
    cars?: ICar[]
}

export default function ProductsView({ cars }:IProductsView)  {
    return (
        <>
            <Grid container direction="row" justifyContent="flex-start" alignItems="space-between">
                {cars !== undefined && cars.map(car => <ProductCard key={car.id} car={car} />)}
            </Grid>
        </>
    )
}
