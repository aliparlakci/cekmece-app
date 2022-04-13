import * as React from "react"
import { Link, Route, Switch } from "react-router-dom"
import { Home } from "@mui/icons-material"
import { AppBar, IconButton, Toolbar, Typography, createTheme, Grid } from "@mui/material"
import { ThemeProvider } from "@mui/styles"
import { Box } from "@mui/system"

import CarListView from "./components/CarListView"
import CategoryListView from "./components/CategoryListView"
import DistributorListView from "./components/DistributorListView"

const theme = createTheme({
    palette: {
        primary: {
            main: "#1a1a1a",
        },
    },
})

export default function AdminPage() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="fixed">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                            >
                                <Home />
                            </IconButton>
                            <Box sx={{display: "flex", gap: "1rem"}}>
                                <Typography noWrap sx={{ display: { xs: "none", sm: "block" } }}>
                                    <Link to="/admin/cars">Cars</Link>
                                </Typography>
                                <Typography noWrap sx={{ display: { xs: "none", sm: "block" } }}>
                                    <Link to="/admin/categories">Categories</Link>
                                </Typography>
                                <Typography noWrap sx={{ display: { xs: "none", sm: "block" } }}>
                                    <Link to="/admin/distributors">Distributors</Link>
                                </Typography>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>
            </ThemeProvider>
            <Box marginTop={2}>
                <Switch>
                    <Route path="/admin/cars">
                        <CarListView />
                    </Route>
                    <Route path="/admin/categories">
                        <CategoryListView />
                    </Route>
                    <Route path="/admin/distributors">
                        <DistributorListView />
                    </Route>
                </Switch>
            </Box>
        </>
    )
}
