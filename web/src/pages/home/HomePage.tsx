import React, { useEffect, useState } from "react"
import { Box, Container, createTheme, Grid } from "@mui/material"
import useSWR from "swr"
import { useHistory } from "react-router-dom"

import ProductsView from "./components/ProductsView"
import FilterMenu, { defaultFilterOptions, IFilterOptions } from "./components/FilterMenu"
import NavBar from "../../components/NavBar"
import { ThemeProvider } from "@mui/styles"
import ICar from "../../models/car"
import fetcher from "../../utils/fetcher"
import ICategory from "../../models/category"
import IDistributor from "../../models/distributor"

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})

const buildFilterURL = (search: string, filter: IFilterOptions): string => {
    const params = new URLSearchParams()
    params.append("sort", filter.sort)
    params.append("minYear", `${filter.minYear}`)
    params.append("maxYear", `${filter.maxYear}`)

    if (search !== "") params.append("q", search)
    if (filter.category !== "") params.append("category", filter.category)
    if (filter.distributor !== "") params.append("distributor", filter.distributor)
    if (filter.minPrice !== "") params.append("minPrice", filter.minPrice)
    if (filter.maxPrice !== "") params.append("maxPrice", filter.maxPrice)

    return `/api/cars?${params.toString()}`
}

export default function HomePage() {
    const [fetchURL, setFetchURL] = useState("")

    const { data: cars } = useSWR<ICar[]>(fetchURL, fetcher)
    const { data: categories } = useSWR<ICategory[]>("/api/categories", fetcher)
    const { data: distributors } = useSWR<IDistributor[]>("/api/distributors", fetcher)

    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState(defaultFilterOptions)

    useEffect(() => {
        setFetchURL(buildFilterURL(search, filter))
    }, [search])

    return (
        <>
            <ThemeProvider theme={theme}>
                <NavBar search={search} onSearch={setSearch} />
                <div className="flex flex-row justify-center mt-20">
                    <Grid item xs={3} sx={{ display: { xs: "none", lg: "inline" }, zIndex: 10 }}>
                        <Container sx={{ top: 100, justifyContent: "center" }}>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                                {categories && distributors && <>
                                    <FilterMenu categories={categories} distributors={distributors}
                                                filter={filter} setFilter={setFilter} onSearch={() => setFetchURL(buildFilterURL(search, filter))} />
                                </>}
                            </Grid>
                        </Container>
                    </Grid>
                    <div className="max-w-screen-lg" >
                        <ProductsView cars={cars} />
                    </div>
                </div>

            </ThemeProvider>
        </>
    )
}
