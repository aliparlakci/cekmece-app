import React from "react"
import { Box, Container, createTheme, Grid } from "@mui/material"
import useSWR from "swr"

import ProductsView from "./components/ProductsView"
import FilterMenu from "./components/FilterMenu"
import NavBar from "./components/NavBar"
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

export default function HomePage() {
    const { data: cars } = useSWR<ICar[]>("/api/cars", fetcher)
    const { data: categories } = useSWR<ICategory[]>("/api/categories", fetcher)
    const { data: distributors } = useSWR<IDistributor[]>("/api/distributors", fetcher)

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
                                                onFilter={(filter) => console.log({ filter })} />
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
