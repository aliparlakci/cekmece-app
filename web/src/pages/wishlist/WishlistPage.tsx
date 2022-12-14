import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import NavBar from "../../components/NavBar"
import { Box, Button, createTheme, ThemeProvider, Typography } from "@mui/material"
import ProductSection from "./components/ProductSection"
import useAuth from "../../hooks/useAuth"
import useWishlist from "../../hooks/useWishlist"
import { pink } from '@mui/material/colors';

const pinky = pink['A400'];

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})

export default function WishlistPage() {
    const { wishlist, refresh } = useWishlist()
    const { user } = useAuth()
    const history = useHistory()

    useEffect(() => {
        refresh()
    }, [])

    return (
        <>
            <ThemeProvider theme={theme}>
                <div>
                    <NavBar />
                    <div className="p-3 w-full md:max-w-3xl mx-auto mt-20">
                        {/* Heading */}
                        <Box
                            sx={{
                                mt: 2,
                                mb: 2,
                            }}
                        ></Box>
                        <Typography align="center" variant="h3" sx={{ color: pinky }}> ♥ Wishlist ♥</Typography>
                        {/* vertically center parent div */}
                        <div className="flex flex-row mt-7 mobile:flex-col">
                            {/* product div */}
                            <div className="flex flex-col flex-1">
                                {/* Product Sections Below */}
                                {wishlist.map((item, i) => <ProductSection key={i} item={item} />)}
                            </div>

                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}
