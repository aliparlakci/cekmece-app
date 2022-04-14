import React, { useState } from "react"
import {
    Button,
    Box,
    Container,
    createTheme,
    Paper,
    Grid,
    ThemeProvider,
    Typography,
    Divider,
} from "@mui/material"
import BrandsList from "./BrandsList"
import YearSlider from "./YearSlider"
import PriceSelect from "./PriceSelect"
import CategorySelect from "./CategorySelect"
import SortCars from "./SortCars"

import ICategory from "../../../models/category"
import IDistributor from "../../../models/distributor"

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
    components: {
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: "body2",
                    },
                    style: {
                        fontSize: 11,
                    },
                },
            ],
        },
    },
})

type IOnFilter = (filter: filter) => any

interface IFilter {
    minPrice?: number
    maxPrice?: number
    minYear?: number
    maxYead?: number
    brands: number[]
    categories: number[]
}

interface FilterMenuProps {
    categories: ICategory[]
    distributors: IDistributor[]
    onFilter: IOnFilter
}

const defaultState: IFilter = {
    brands: [],
    categories: []
}

export default function FilterMenu({ categories, distributors, onFilter }) {
    const [filter, setFilter] = useState(defaultState)

    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid item sx={{ width: { lg: 300, xl: 400 }, display: { xs: "none", lg: "inline" } }}>
                    <Container>
                        <Box sx={{ alignItems: "right", direction: "row", justifyContent: "right" }}>
                            <Paper elevation={24} className="paper" sx={{
                                position: "sticky",
                                alignSelf: "right",
                                maxHeight: 0.85,
                                overflow: "auto",
                                borderRadius: 0,
                                width: { lg: 280, xl: 380 },
                            }}>
                                <Box sx={{ paddingX: 2, paddingY: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight:"bold", color:"#666"}} >Sort Cars</Typography>
                                </Box>
                                <Divider variant="middle"/>
                                <Box sx={{ paddingX: 5, paddingY: 2 }}>
                                    <SortCars/>
                                </Box>
                                <Box sx={{ paddingX: 2, paddingY: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight:"bold", color:"#666"}} >Filter Cars</Typography>
                                </Box>
                                <Divider variant="middle" />
                                <Box sx={{ paddingX: 5, paddingY: 2 }}>
                                    <Typography sx={{ fontWeight: "bold" }}>Select Brands:</Typography>
                                    <BrandsList />
                                </Box>
                                <Divider variant="middle" />
                                <Box sx={{ paddingX: 5, paddingY: 2 }}>
                                    <Typography sx={{ fontWeight: "bold" }}>Between Years:</Typography>
                                    <YearSlider />
                                </Box>
                                <Divider variant="middle" />
                                <Box sx={{ paddingX: 5, paddingY: 2 }}>
                                    <Typography sx={{ fontWeight: "bold" }}>Price Range:</Typography>
                                    <PriceSelect />
                                </Box>
                                <Divider variant="middle" />
                                <Box sx={{ paddingX: 5, paddingY: 2 }}>
                                    <Typography sx={{ fontWeight: "bold" }}>Select Category:</Typography>
                                    <CategorySelect />
                                </Box>
                                <Box>
                                    <Button variant="contained" fullWidth={true} sx={{ borderRadius: 0 }}>
                                        Show Cars
                                    </Button>
                                </Box>
                            </Paper>
                        </Box>
                    </Container>
                </Grid>
            </ThemeProvider>
        </>
    )
}
