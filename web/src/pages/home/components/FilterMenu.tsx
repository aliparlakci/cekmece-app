import React, { useState } from "react"
import { Button, Box, Container, createTheme, Paper, Grid, ThemeProvider, Typography, Divider } from "@mui/material"
import BrandsList from "./BrandsList"
import YearSlider from "./YearSlider"
import PriceSelect from "./PriceSelect"
import CategorySelect from "./CategorySelect"
import SortCars from "./SortCars"

import ICategory from "../../../models/category"
import IDistributor from "../../../models/distributor"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import category from "../../../models/category"
import DistributorSelect from "./DistributorSelect"

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

type IOnFilter = (filter: IFilter) => any

interface IFilter {
    minPrice?: string
    maxPrice?: string
    minYear?: number
    maxYear?: number
    brand?: string
    category?: string
}

interface FilterMenuProps {
    categories: ICategory[]
    distributors: IDistributor[]
    onFilter: IOnFilter
}

const defaultState: IFilter = {
    minYear: 2000,
    maxYear: 2022
}

export default function FilterMenu({ categories, distributors, onFilter }: FilterMenuProps) {
    const [filter, setFilter] = useState(defaultState)

    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid item sx={{ width: { lg: 300, xl: 400 }, display: { xs: "none", lg: "inline" } }}>
                    <Container>
                        <Box sx={{ alignItems: "right", direction: "row", justifyContent: "right" }}>
                            <Paper
                                elevation={24}
                                className="paper"
                                sx={{
                                    position: "sticky",
                                    alignSelf: "right",
                                    maxHeight: 0.85,
                                    overflow: "auto",
                                    borderRadius: 0,
                                    width: { lg: 280, xl: 380 },
                                }}
                            >
                                <Box sx={{ paddingX: 2, paddingY: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#666" }}>
                                        Sort Cars
                                    </Typography>
                                </Box>
                                <Divider variant="middle" />
                                <Box sx={{ paddingX: 5, paddingY: 2 }}>
                                    <SortCars />
                                </Box>
                                <Box sx={{ paddingX: 2, paddingY: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#666" }}>
                                        Filter Cars
                                    </Typography>
                                </Box>
                                <Divider variant="middle" />
                                <Box sx={{ paddingX: 5, paddingY: 2 }}>
                                    <Typography sx={{ fontWeight: "bold" }}>Select Category:</Typography>
                                    <CategorySelect
                                        categories={categories}
                                        value={filter.category}
                                        onChange={(value) =>
                                            setFilter((old) => ({
                                                ...old,
                                                category: value,
                                            }))
                                        }
                                    />
                                </Box>
                                <Divider variant="middle" />
                                <Box sx={{ paddingX: 5, paddingY: 2 }}>
                                    <Typography sx={{ fontWeight: "bold" }}>Select Brand:</Typography>
                                    <DistributorSelect
                                        distributors={distributors}
                                        onChange={(distributor) =>
                                            setFilter((old) => ({
                                                ...old,
                                                distributor,
                                            }))
                                        }
                                    />
                                </Box>
                                <Divider variant="middle" />
                                <Box sx={{ paddingX: 5, paddingY: 2 }}>
                                    <Typography sx={{ fontWeight: "bold" }}>Between Years:</Typography>
                                    <YearSlider minYear={filter.minYear} maxYear={filter.maxYear} onChange={(minYear, maxYear) => setFilter(old => ({...old, minYear, maxYear}))}/>
                                </Box>
                                <Divider variant="middle" />
                                <Box sx={{ paddingX: 5, paddingY: 2 }}>
                                    <Typography sx={{ fontWeight: "bold" }}>Price Range:</Typography>
                                    <PriceSelect
                                        minPrice={filter.minPrice}
                                        maxPrice={filter.maxPrice}
                                        onMinPriceChange={(minPrice) =>
                                            setFilter((old) => ({
                                                ...old,
                                                minPrice,
                                            }))
                                        }
                                        onMaxPriceChange={(maxPrice) =>
                                            setFilter((old) => ({
                                                ...old,
                                                maxPrice,
                                            }))
                                        }
                                    />
                                </Box>
                                <Divider variant="middle" />
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
