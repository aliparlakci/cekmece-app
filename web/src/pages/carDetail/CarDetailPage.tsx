import React, { useState, createContext } from "react"
import { Redirect, useParams } from "react-router-dom"
import useSWR from "swr"
import { ThemeProvider } from "@emotion/react"
import { Button, TextField, Box, Typography } from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"

import theme from "./theme"
import ReviewsButton from "./components/buttons/ReviewsButton"
import LeaveAReviewButton from "./components/buttons/LeaveAReviewButton"
import NavBar from "../../components/NavBar"
import fetcher from "../../utils/fetcher"
import ICar from "../../models/car"
import useCart from "../../hooks/useCart"
import { FavoriteBorderTwoTone, RemoveShoppingCart } from "@mui/icons-material"

function CarDetailPage() {
    const [amount, setAmount] = useState(1)
    const { add, cart } = useCart()

    const { carId } = useParams<{ carId?: string | undefined }>()
    if (!carId) return <Redirect to="/" />
    if (isNaN(parseInt(carId))) return <Redirect to="/" />

    const { data: car, mutate } = useSWR<ICar>(`/api/cars/${carId}`, fetcher)
    if (car === undefined) return <></>

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className="mt-20">
                    <div className="flex justify-center mobile:flex-col mobile:mt-4 mobile:p-3">
                        <div className="flex-1 flex-col items-center justify-center m-10">
                            <img
                                src={car.photoUrl}
                                className="product_img"
                                alt="product_image"
                                style={{ aspectRatio: "9/5", objectFit: "cover", width: "100%" }}
                            />
                            <p className="mt-4 text-2xl"></p>
                            <h6 className="title text-[20px] mobile:text-[10px]">
                                <u> Items in stock:</u> <b> {car?.quantity} </b>
                            </h6>

                            <Box
                                sx={{
                                    mt: 2,
                                    mb: 2,
                                }}
                            ></Box>
                           
                            <Button variant="outlined" color="error"  startIcon={<FavoriteBorderTwoTone /> }>
                                Add to Wishlist
                            </Button>
                        </div>
                        <div
                            className="flex-[1.3] flex flex-col items-start w-32 justify-items-center mt-10 mobile:items-center">
                            <h1 className="title text-[40px] mobile:text-[30px]">
                                {car.distributor ? car.distributor.name : "Porsche"}
                            </h1>
                            <h1 className="title text-[40px] mobile:text-[30px]">
                                <b>{car.name ? car.name : "Panamera"}</b>
                            </h1>
                            <p className="pr-[4rem] text-justify mt-4 mobile:pr-0">
                                {car.description}
                            </p>
                            <div className="flex flex-col place-self-start">
                                {car.discount !== 0 &&
                                    <p className="mt-4 text-xl">
                                    Old Price: <s>${car.price}</s> 
                                    </p>
                                    
                                }
                                {car.discount !== 0 &&
                                    <p className="mt-4 text-3xl">
                                    Your Deal: <b> ${car.price * (100 - car.discount) / 100}</b>
                                    </p>
                                    
                                }

                                {car.discount === 0 &&
                                <p className="mt-4 text-3xl">
                                    Price: <b>${car.price}</b>
                                </p>
                                
                                }
                                <p className="mt-2 text-2xl">
                                    Year: <b>{car.model}</b>
                                </p>
                                <p className="mt-2 text-2xl">
                                    Warranty:{" "}
                                    <b>
                                        {car.warranty} year{car.warranty === 1 ? "" : "s"}
                                    </b>
                                </p>
                                <p className="mt-2 text-2xl">
                                    Vendor: <b>{car.distributor?.name}™ Turkey</b>
                                </p>
                            </div>
                            <div className="flex flex-row justify-start items-baseline gap-x-8 mt-5">
                                {car.quantity ? (
                                    <TextField
                                        focused
                                        value={amount}
                                        onChange={(event) =>
                                            setAmount(Math.max(Math.min(parseInt(event.target.value), car.quantity - (car.id ? (cart[car.id] ? cart[car.id].amount : 0) : 0)), 1))
                                        }
                                        label="Quantity"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        sx={{ marginTop: 2, width: 80 }}
                                    />
                                ) : (
                                    []
                                )}
                                {car.quantity ? (
                                    <Button
                                        endIcon={<AddShoppingCartIcon />}
                                        className="text-white bg-[#000] p-3 mr-5"
                                        sx={{
                                            minWidth: 250,
                                            maxHeight: 35,
                                            fontWeight: 700,
                                            color: "white",
                                            backgroundColor: "black",
                                            ":hover": {
                                                backgroundColor: "#2D2D2D",
                                            },
                                        }}
                                        onClick={() => car.id && add(car.id, amount)}
                                    >
                                        Add to Cart
                                    </Button>
                                ) : (
                                    []
                                )}
                                {!car.quantity ? (
                                    <Button
                                        endIcon={<RemoveShoppingCart />}
                                        className="text-white bg-[#000] p-3 mr-5"
                                        sx={{
                                            minWidth: 250,
                                            maxHeight: 35,
                                            fontWeight: 700,
                                            color: "black",
                                            backgroundColor: "white",
                                            border: "solid 1px black",
                                            ":hover": {
                                                backgroundColor: "#2D2D2D",
                                            },
                                        }}
                                        disabled={true}
                                    >
                                        Out of stock
                                    </Button>
                                ) : (
                                    []
                                )}
                            </div>
                            <Box
                                sx={{
                                    mt: 2,
                                    mb: 2,
                                }}
                            >
                                <ReviewsButton
                                    carId={carId}
                                    averageRating={parseFloat(car.averageRating)}
                                    reviewCount={car.reviewCount}
                                />
                                {car.userCanReviewCar && <LeaveAReviewButton carId={carId} />}
                            </Box>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}

export default CarDetailPage
