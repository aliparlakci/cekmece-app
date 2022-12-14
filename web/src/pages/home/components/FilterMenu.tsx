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
    InputBase,
    TextField,
} from "@mui/material"
import YearSlider from "./YearSlider"
import PriceSelect from "./PriceSelect"
import CategorySelect from "./CategorySelect"
import SortCars, { SortType } from "./SortCars"

import ICategory from "../../../models/category"
import IDistributor from "../../../models/distributor"
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

export interface IFilterOptions {
    minPrice: string
    maxPrice: string
    minYear: number
    maxYear: number
    distributor: string
    category: string
    sort: SortType
}

interface FilterMenuProps {
    categories: ICategory[]
    distributors: IDistributor[]
    filter: IFilterOptions
    setFilter: React.Dispatch<React.SetStateAction<IFilterOptions>>
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
    onShowCars: () => void
    onResetFilter: () => void
}

export const defaultFilterOptions: IFilterOptions = Object.freeze({
    minYear: 2000,
    maxYear: 2022,
    minPrice: "",
    maxPrice: "",
    distributor: "",
    category: "",
    sort: "mostPopular",
})

export default function FilterMenu({
    filter,
    setFilter,
    categories,
    distributors,
    search,
    setSearch,
    onShowCars,
    onResetFilter
}: FilterMenuProps) {
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
                                <Box sx={{ paddingX: 5, paddingY: 2 }}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Search"
                                        variant="standard"
                                        onChange={(event) => setSearch(event.target.value)}
                                        value={search}
                                    />
                                </Box>
                                <Divider variant="middle" />
                                <Box sx={{ paddingX: 5, paddingY: 2 }}>
                                    <SortCars
                                        sort={filter.sort}
                                        onChange={(sort) => setFilter((old) => ({ ...old, sort }))}
                                    />
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
                                    <YearSlider
                                        minYear={filter.minYear}
                                        maxYear={filter.maxYear}
                                        onChange={(minYear, maxYear) =>
                                            setFilter((old) => ({
                                                ...old,
                                                minYear,
                                                maxYear,
                                            }))
                                        }
                                    />
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
                                <div className="flex flex-row">
                                    <div className="w-full">
                                        <Button
                                            variant="text"
                                            fullWidth={true}
                                            sx={{ borderRadius: 0 }}
                                            onClick={onResetFilter}
                                        >
                                            Reset Filter
                                        </Button>
                                    </div>
                                    <div className="w-full">
                                        <Button
                                            variant="contained"
                                            fullWidth={true}
                                            sx={{ borderRadius: 0 }}
                                            onClick={onShowCars}
                                        >
                                            Show Cars
                                        </Button>
                                    </div>
                                </div>
                            </Paper>
                        </Box>
                    </Container>
                </Grid>
            </ThemeProvider>
        </>
    )
}
