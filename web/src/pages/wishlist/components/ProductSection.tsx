import React, { useState } from "react"
import ClearIcon from "@mui/icons-material/Clear"
import { IconButton, Box } from "@mui/material"
import Button from "@mui/material/Button"
import useWishlist, { IWishlistItem } from "../../../hooks/useWishlist"
import useCart from "../../../hooks/useCart"

interface IProductSelectionProps {
    item: IWishlistItem
}

const SummaryItemStyle = "SummaryItem flex justify-between mt-3 w-[100%]"
const ProductDivStyle = "flex w-[100%] h-auto items-center mobile:flex-col"
const PriceQuantityStyle = "flex-auto flex flex-col justify-center items-center mobile:mt-7 mobile:mb-7"

export default function ProductSection({ item }: IProductSelectionProps) {
    const { cart, add } = useCart()
    const { remove } = useWishlist()

    const [loading, setLoading] = useState(false)

    const handleAddToCart = async () => {
        setLoading(true)
        await add(item.item.id, 1)
        setLoading(false)
    }

    const handleRemoveFromWishlist = async () => {
        setLoading(true)
        await remove(item.id)
        setLoading(false)
    }

    if (!item) return <></>

    return (
        <>
            <div className="max-w-screen-lg py-2 px-2 mb-10 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
                <Box className="grid grid-cols-2 gap-6 flex">
                <div className="product flex items-center pl-5 self-start basis-8/12">
                    <img
                        src={item.item.photoUrl}
                        className="product_img"
                        alt="product_image"
                        style={{ aspectRatio: "8/5", objectFit: "cover", maxHeight: "5rem" }}
                    />

                    <div className="flex flex-col text-xl mt-3 pl-4">
                        <p>
                            <b className="mr-2"> Brand:</b>{item.item.distributor?.name}
                        </p>
                        <p>
                            <b className="mr-2">Model:</b>{item.item.name}
                        </p>
                        <p>
                            <b className="mr-2">Year:</b>{item.item.model}
                        </p>
                        <p>
                            <b className="mr-2">Price:</b>${item.item.price * (100 - item.item.discount) / 100}
                        </p>
                        {item.item.quantity === 0 && <p>
                            Out of stock
                        </p>}
                    </div>
                </div>

                <div className="flex flex-col justify-center w-40 justify-self-end pr-5">
                    <Button variant="text" color="success" disabled={loading || item.item.quantity <= (cart[item.item.id] ? cart[item.item.id].amount : 0)} onClick={handleAddToCart}>Add to cart</Button>
                    <Button variant="text" color="error" disabled={loading} onClick={handleRemoveFromWishlist}>Remove</Button>
                </div>
                </Box>
            </div>
        </>
    )
}