import * as React from "react"
import { Link, Route, Switch } from "react-router-dom"
import { AppBar, IconButton, Toolbar, Typography, createTheme, Grid, Button } from "@mui/material"
import { ThemeProvider } from "@mui/styles"
import { Box } from "@mui/system"

import CarListView from "./components/CarListView"
import CategoryListView from "./components/CategoryListView"
import DistributorListView from "./components/DistributorListView"
import NavBar from "../../components/NavBar"

export default function AdminPage() {
    return (
        <>
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
                <Route path="/admin/reviews">
                    Reviews
                </Route>
            </Switch>
        </>
    )
}
