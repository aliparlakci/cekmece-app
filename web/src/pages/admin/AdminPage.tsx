import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import CarListView from "./components/CarListView"
import { Switch } from "react-router-dom"

export default function AdminPage() {
    return (
        <>
            <Switch></Switch>
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
                <CssBaseline />
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }} className="h-full">
                        <CarListView />
                    </Box>
                </Box>
            </Box>
        </>
    )
}
