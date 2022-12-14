import React from "react"
import { useHistory } from "react-router-dom"
import NavBar from "../../components/NavBar"
import Counter from "./components/Counter"
import { Box, Button, createTheme, ThemeProvider, Typography } from "@mui/material"
import ProductSection from "./components/ProductSection"
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

export default function CartPage() {
    const { cart } = useCart()
    const { user } = useAuth()
    const history = useHistory()

    return (
        <>
            <ThemeProvider theme={theme}>
                <div>
                    <div className="p-3">
                        <div className="flex justify-center text-5xl">Cart</div>

                        {/* Heading */}
                        <div className="flex items-center justify-between ml-4 mt-4 mobile:flex-col">
                            <div className="flex text-lg hover:cursor-pointer mobile:m-5">
                                <Typography variant="h4">Cart:</Typography>
                            </div>
                        </div>

                        {/* vertically center parent div */}
                        <div className="flex flex-row mt-7 mobile:flex-col">
                            {/* product div */}
                            <div className="flex flex-col flex-1">
                                {/* Product Sections Below */}
                                {Object.keys(cart).map((id, i) => <ProductSection key={i} item={cart[id]} />)}
                            </div>
                            <div
                                className="Summary flex-[0.4] flex flex-col items-center w-auto h-72 ml-6 mr-6 p-5 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl text-lg mobile:mb-6">
                                <h1 className="text-[2rem]">SUMMARY</h1>
                                {/*<div className={SummaryItemStyle}>*/}
                                {/*    <p>SubTotal:</p>*/}
                                {/*    <p>$206.000</p>*/}
                                {/*</div>*/}
                                {/*<div className={SummaryItemStyle}>*/}
                                {/*    <p>Shipping:</p>*/}
                                {/*    <p>$10</p>*/}
                                {/*</div>*/}
                                {/*<div className={SummaryItemStyle}>*/}
                                {/*    <p>Discount:</p>*/}
                                {/*    <p>-$10</p>*/}
                                {/*</div>*/}

                                <Box className="w-[100%] mt-[30%]">
                               
                                <div className={SummaryItemStyle + " text-3xl font-bold"}>

                                    <p>Total:</p>
                                    <p>${Object.keys(cart).reduce((prev, id) => cart[id] && cart[id].item.price * cart[id].amount * (100 - cart[id].item.discount) / 100 + prev, 0)}</p>
                                </div>
                                
                                    {user && <Button variant="contained" fullWidth={true} sx={{ borderRadius: 0 }}
                                                     onClick={() => history.push("/checkout")} disabled={!Object.keys(cart).length}>
                                        Checkout
                                    </Button>
                                    }
                                    {
                                        user === null &&
                                        <Button variant="contained" fullWidth={true} sx={{ borderRadius: 0 }}
                                                onClick={() => history.push("/login")}>
                                            Login to purchase
                                        </Button>
                                    }
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}
