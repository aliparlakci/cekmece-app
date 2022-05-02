import React from "react"
import { Button, Container, createTheme, ThemeProvider, Divider, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import NavBar from "../components/NavBar"
import useCart from "../hooks/useCart"

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})

const columns: GridColDef[] = [
    {
        field: "brand",
        headerName: "Brand",
        width: 150,
        editable: false,
    },
    {
        field: "model",
        headerName: "Model",
        width: 150,
        editable: false,
    },
    {
        field: "price",
        type: "number",
        headerName: "Price",
        sortable: false,
        width: 160,
    },
    {
        field: "amount",
        headerName: "Amount",
        type: "number",
        width: 110,
        editable: true,
    },
    {
        field: "subtotal",
        type: "number",
        headerName: "Subtotal",
        sortable: false,
        width: 160,
    },
]

const rows = [
    { id: 1, brand: "Porsche", model: "911 GT3 Touring", amount: 1, price: 200000 },
    { id: 2, brand: "Fiat", model: "Egea", amount: 1, price: 18000 },
    { id: 3, brand: "Ford", model: "Focus RS", amount: 2, price: 32000 },
    { id: 4, brand: "Rolls Royce", model: "Cullinan", amount: 1, price: 420000 },
]

export default function CartPage() {
    const { cart } = useCart()

    return (
        <>
            <ThemeProvider theme={theme}>
                <NavBar />
                <div className="flex flex-row justify-center mt-20">
                    <Container>
                        <Typography variant="h3" mb={1}>
                            Shopping Cart
                        </Typography>
                        <Divider variant="fullWidth" className="mt-20" />
                        <div style={{ width: "100%" }} className="mt-4">
                            <DataGrid
                                autoHeight
                                rows={Object.keys(cart).map((id, i) => ({
                                    id: i,
                                    brand: cart[id].item.distributor?.name,
                                    model: cart[id].item.name,
                                    price: cart[id].item.price,
                                    amount: cart[id].amount,
                                    subtotal : cart[id].item.price * cart[id].amount
                                }))}
                                columns={columns}
                                checkboxSelection
                                disableSelectionOnClick
                            />
                        </div>
                        <div className="flex flex-row justify-between mt-4">
                            <Typography variant="h5" className="float-left">
                                Total Price: ${Object.keys(cart).reduce((prev, id) => cart[id].item.price * cart[id].amount + prev, 0)}
                            </Typography>
                            <Button variant="contained">Checkout</Button>
                        </div>
                    </Container>
                </div>
            </ThemeProvider>
        </>
    )
}
