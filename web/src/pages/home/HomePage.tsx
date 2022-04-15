import React from "react"
import { Box, Container, createTheme, Grid } from "@mui/material"
import useSWR from "swr"

import ProductsView from "./components/ProductsView"
import FilterMenu, { IFilterOptions } from "./components/FilterMenu"
import NavBar from "./components/NavBar"
import { ThemeProvider } from "@mui/styles"
import ICar from "../../models/car"
import fetcher from "../../utils/fetcher"
import ICategory from "../../models/category"
import IDistributor from "../../models/distributor"
import { useHistory } from "react-router-dom"

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})

const buildFilterURL = (filter: IFilterOptions): string => {
    const params = new URLSearchParams()
    params.append("sort", filter.sort)
    params.append("minYear", `${filter.minYear}`)
    params.append("maxYear", `${filter.maxYear}`)

    if (filter.category !== "") params.append("category", filter.category)
    if (filter.distributor !== "") params.append("distributor", filter.distributor)
    if (filter.minPrice !== "") params.append("minPrice", filter.minPrice)
    if (filter.maxPrice !== "") params.append("maxPrice", filter.maxPrice)

    return `/api/cars?${params.toString()}`
}

export default function HomePage() {
    const { data: cars } = useSWR<ICar[]>("/api/cars", fetcher)
    const { data: categories } = useSWR<ICategory[]>("/api/categories", fetcher)
    const { data: distributors } = useSWR<IDistributor[]>("/api/distributors", fetcher)

    const handleFilterChange = (filter: IFilterOptions) => {
        console.log(buildFilterURL(filter))
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <NavBar />
                <div className="flex flex-row justify-center mt-20">
                    <Grid item xs={3} sx={{ display: { xs: "none", lg: "inline" }, zIndex: 10 }}>
                        <Container sx={{ top: 100, justifyContent: "center" }}>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                                {categories && distributors && <>
                                    <FilterMenu categories={categories} distributors={distributors}
                                                onFilter={handleFilterChange} />
                                </>}
                            </Grid>
                        </Container>
                    </Grid>
                    <div className="max-w-screen-lg">
                        {cars && <ProductsView cars={cars} />}
                    </div>
                </div>

            </ThemeProvider>
        </>
    )
}
