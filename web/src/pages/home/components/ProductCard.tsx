import React, { useState } from "react"
import {
    Button,
    Box,
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    createTheme,
    Paper,
    Grid,
    ThemeProvider,
    Typography,
    Rating,
} from "@mui/material"
import Fab from "@mui/material/Fab"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import ICar from "../../../models/car"
import useCart from "../../../hooks/useCart"
import useWishlist from "../../../hooks/useWishlist"
import { Link } from "react-router-dom"
import { Favorite, FavoriteBorderOutlined, RemoveShoppingCart } from "@mui/icons-material"
import useAuth from "../../../hooks/useAuth"

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

interface IProductCardProps {
    car: ICar
}

export default function ProductCard({ car }: IProductCardProps) {
    const { cart, add } = useCart()
    const { wishlist, exists, toggle } = useWishlist()
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()

    const handleAddToCart = async () => {
        setLoading(true)
        await add(car.id, 1)
        setLoading(false)
    }

    const handleToggleToWishlist = async () => {
        setLoading(true)
        await toggle(car.id)
        setLoading(false)
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid item xs={12} md={4}>
                    <Box marginX={2} marginBottom={4}>
                        <Box className="shadow-lg hover:transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-105" sx={{ borderRadius: 0 }}>
                            {user && <div className="absolute m-1">
                                <Fab size="small" 
                                     color="primary"
                                     aria-label="add"
                                     onClick={handleToggleToWishlist}
                                     disabled={loading}>
                                    {
                                        exists(car.id) ? <Favorite /> : <FavoriteBorderOutlined />
                                    }
                                </Fab>
                            </div>}
                            <Box>
                                <Link to={`/cars/${car.id}`}>
                                    <img
                                        src={car.photoUrl}
                                        className="product_img"
                                        alt="product_image"
                                        style={{
                                            aspectRatio: "9/5",
                                            objectFit: "cover",
                                            width: "100%",
                                            minWidth: "12rem",
                                        }}
                                    />
                                </Link>
                            </Box>
                            <Box
                                marginX={0.5}
                                marginTop={0.5}
                                sx={{ alignItems: "center", direction: "column", justifyContent: "center" }}
                            >
                                <Link to={`/cars/${car.id}`}>
                                    <Typography variant="body1" marginX={0.5} fontWeight="Light" textAlign="left">
                                        {car.model}
                                    </Typography>
                                    <Typography variant="h6" marginX={0.5} fontWeight="Light" textAlign="left">
                                        {car.distributor?.name}
                                    </Typography>
                                    <Typography variant="h5" marginX={0.5} fontWeight="Bold" textAlign="left">
                                        {car.name}
                                    </Typography>
                                </Link>
                            </Box>
                            <Box
                                marginX={0.5}
                                marginTop={0.5}
                                sx={{ alignItems: "center", direction: "column", justifyContent: "center" }}
                            >
                                <Typography variant="body1" marginX={0.5} fontWeight="lighter" textAlign="left">
                                    {car.quantity} in stock
                                </Typography>
                            </Box>
                            <Box
                                sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                                marginTop={1}
                                marginBottom={1}
                                marginX={1}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Rating
                                        name="size-small"
                                        size="small"
                                        value={parseFloat(car.averageRating)}
                                        precision={0.25}
                                        readOnly
                                    />
                                    <Typography variant="body2" marginLeft={0.5}>
                                        {parseFloat(car.averageRating)}
                                    </Typography>
                                    <Typography variant="body2" marginLeft={0.5}>
                                        {" "}
                                        ({car.reviewCount || "0"} reviews)
                                    </Typography>
                                </Box>
                                <Box paddingBottom={0.5}>
                                        
                                        {car.discount !== 0 &&
                                            <Typography variant="h5" fontWeight="bold" textAlign="right" color="green">
                                                ${car.price * (100 - car.discount) / 100}
                                            </Typography>
                                    }

                                        {car.discount !== 0 &&
                                            <Typography variant="h6" textAlign="right" color="error"> $<s>{car.price}</s> </Typography>
                                        }


                                        {car.discount === 0 &&
                                            
                                            <Typography variant="h5" fontWeight="bold" textAlign="right">
                                                ${car.price}
                                            </Typography>
                                        }

                                        {car.discount === 0 &&
                                        
                                        <Typography variant="h6" fontWeight="bold" textAlign="right">
                                            <br />
                                        </Typography>
                                        }

                                </Box>
                            </Box>

                            <Box>
                                {car.quantity ? (
                                    <>
                                        <Button
                                            variant="text"
                                            endIcon={<AddShoppingCartIcon />}
                                            sx={{ borderRadius: 0 }}
                                            fullWidth={true}
                                            onClick={handleAddToCart}
                                            disabled={
                                                car.quantity <= (cart[car.id] ? cart[car.id].amount : 0) || loading
                                            }
                                        >
                                            Add to Cart
                                        </Button>
                                    </>
                                ) : null}
                                {!car.quantity && (
                                    <>
                                        <Button
                                            disabled
                                            variant="text"
                                            endIcon={<RemoveShoppingCart />}
                                            sx={{ borderRadius: 0 }}
                                            fullWidth={true}
                                        >
                                            Out of stock
                                        </Button>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </ThemeProvider>
        </>
    )
}
