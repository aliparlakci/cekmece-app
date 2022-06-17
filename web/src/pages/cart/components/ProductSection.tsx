import React from "react"
import ClearIcon from "@mui/icons-material/Clear"
import { IconButton } from "@mui/material"

import Counter from "./Counter"
import useCart, { ICartItem } from "../../../hooks/useCart"

interface IProductSelectionProps {
    item: ICartItem
}

const SummaryItemStyle = "SummaryItem flex justify-between mt-3 w-[100%]"
const ProductDivStyle = "w-[100%] h-auto py-6 mb-6 items-center mobile:flex-col shadow-md transition-all duration-300 ease-in-out hover:shadow-lg grid grid-cols-5"
const PriceQuantityStyle = "flex-auto flex flex-col justify-center items-center mobile:mt-7 mobile:mb-7 col-span-2"

export default function ProductSection({ item }: IProductSelectionProps) {
    const { add, decrease, remove } = useCart()

    if (!item) return <></>

    return (
        <>
            <div className={ProductDivStyle}>
                <div className=" product flex pl-5 self-start col-span-2">
                    <img
                        src={item.item.photoUrl}
                        className="product_img"
                        alt="product_image"
                        style={{ aspectRatio: "9/5", objectFit: "cover", maxHeight: "5rem" }}
                    />

                    <div className="disc flex items-start justify-between h-auto flex-col ml-6">
                        <p>
                            <b className="mr-2">Brand:</b>{item.item.distributor?.name}
                        </p>
                        <p>
                            <b className="mr-2">Model:</b>{item.item.name}
                        </p>
                        <p>
                            <b className="mr-2">Year:</b>{item.item.model}
                        </p>
                    </div>
                </div>

                {/*Price and Quantity Div*/}
                <div className={PriceQuantityStyle}>
                    <div>
                        <div className="counter flex items-center text-2xl justify-start">
                            Quantity
                            <div className="ml-5 shadow-md flex">
                                <button onClick={() => item.item.id && decrease(item.item.id)} className="bg-[#fff] transition-all hover:bg-[#ccc] text-black w-8 flex items-center justify-center cursor-pointer pb-1">-</button>
                                <div className="w-8 flex items-center justify-center">{item.amount}</div>
                                <button onClick={() => item.item.id && add(item.item.id, 1)} className="bg-[#fff] transition-all hover:bg-[#ccc] text-black w-8 flex items-center justify-center cursor-pointer pb-1">+</button>
                            </div>
                        </div>
                    </div>
                    <p className="flex items-center justify-center text-4xl mt-3">
                        <b>${item.item.price * item.amount}</b>
                    </p>
                </div>

                <div className="grid grid-cols-2">
                    <div></div>
                    <div>
                    <IconButton onClick={() => item.item.id && remove(item.item.id)}>
                        <ClearIcon />
                    </IconButton>
                    </div>
                </div>

            </div>


            
        </>
    )
}