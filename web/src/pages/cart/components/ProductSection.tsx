import React from "react"
import ClearIcon from "@mui/icons-material/Clear"
import { IconButton } from "@mui/material"

import Counter from "./Counter"
import useCart, { ICartItem } from "../../../hooks/useCart"

interface IProductSelectionProps {
    item: ICartItem
}

const SummaryItemStyle = "SummaryItem flex justify-between mt-3 w-[100%]"
const ProductDivStyle = "flex w-[100%] h-auto items-center mobile:flex-col"
const PriceQuantityStyle = "flex-auto flex flex-col justify-center items-center mobile:mt-7 mobile:mb-7"

export default function ProductSection({ item }: IProductSelectionProps) {
    const { add, decrease, remove } = useCart()

    if (!item) return <></>

    return (
        <>
            <div className={ProductDivStyle}>
                <div className=" product flex pl-5 self-start">
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
                                <button onClick={() => item.item.id && decrease(item.item.id)} className="bg-[#000] text-white w-8 flex items-center justify-center cursor-pointer pb-1">-</button>
                                <div className="w-8 flex items-center justify-center border-[2px] border-[#000]">{item.amount}</div>
                                <button onClick={() => item.item.id && add(item.item.id, 1)} className="bg-[#000] text-white w-8 flex items-center justify-center cursor-pointer pb-1">+</button>
                            </div>
                        </div>
                    </div>

                    {item.item.discount !== 0 &&

                            <p className="flex items-center justify-center text-4xl mt-3">
                            <b>${(item.item.price - item.item.discount) * item.amount}</b>
                            </p>
                    
                    }
                    {item.item.discount === 0 &&
                        <p className="flex items-center justify-center text-4xl mt-3">
                            <b>${item.item.price * item.amount}</b>
                        </p>
                    }    

                </div>

                <div className="flex mr-10">
                    <IconButton onClick={() => item.item.id && remove(item.item.id)}>
                        <ClearIcon />
                    </IconButton>
                </div>

            </div>


            <hr className="mb-7 mt-7 mobile:mt-0" />
        </>
    )
}