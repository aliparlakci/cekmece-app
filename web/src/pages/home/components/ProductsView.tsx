import React from "react"
import { Grid } from "@mui/material"
import ProductCard from "./ProductCard"

export default function ProductsView() {
    return (
      <>
        <Grid container direction="row" justifyContent="flex-start" alignItems="space-between">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />

        </Grid>
        </>
    )
}
