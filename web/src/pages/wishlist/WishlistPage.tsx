import React from "react"
import { useHistory } from "react-router-dom"
import NavBar from "../../components/NavBar"
import { Box, Button, createTheme, ThemeProvider, Typography } from "@mui/material"
import ProductSection from "./components/ProductSection"
import Counter from "./components/Counter"
import useCart from "../../hooks/useCart"
import useAuth from "../../hooks/useAuth"

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})

const SummaryItemStyle = "SummaryItem flex justify-between mt-3 w-[100%]"
const ProductDivStyle = "flex w-[100%] h-auto items-center mobile:flex-col"
const PriceQuantityStyle = "flex-auto flex flex-col justify-center items-center mobile:mt-7 mobile:mb-7"

export default function WishlistPage() {
    const { cart } = useCart()
    const { user } = useAuth()
    const history = useHistory()

    return (
        <>
            <ThemeProvider theme={theme}>
                <div>
                    <NavBar />
                    <div className="p-3">
                        <div className="flex justify-center text-5xl">Cart</div>

                        {/* Heading */}
                        <div className="flex items-center justify-between ml-4 mt-4 mobile:flex-col">
                            <div className="flex text-lg hover:cursor-pointer mobile:m-5">
                                <Typography variant="h4">Wishlist ♥</Typography>
                            </div>
                        </div>

                        {/* vertically center parent div */}
                        <div className="flex flex-row mt-7 mobile:flex-col">
                            {/* product div */}
                            <div className="flex flex-col flex-1">
                                {/* Product Sections Below */}
                                {Object.keys(cart).map((id, i) => <ProductSection key={i} item={cart[id]} />)}
                            </div>
 
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}
