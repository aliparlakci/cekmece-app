import { Container, CssBaseline } from "@mui/material"
import React from "react"
import ProductsView from "./components/ProductCard"

export default function HomePage() {
    return (
        <>
            <CssBaseline />
            <Container maxWidth="md" className="h-screen">
                <ProductsView />
            </Container>
        </>
    )
}
