import React from "react"
import ClearIcon from "@mui/icons-material/Clear"
import { IconButton } from "@mui/material"
import { Checkbox } from '@mui/material';
import { FormControlLabel } from '@mui/material'


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

                    <FormControlLabel control={<Checkbox defaultChecked color="success"/>} label="" />

                    <img
                        src={item.item.photoUrl}
                        className="product_img"
                        alt="product_image"
                        style={{ aspectRatio: "8/5", objectFit: "cover", maxHeight: "5rem" }}
                    />

                    <div className="flex items-center justify-center text-xl mt-3">
                        <p>
                        <b className="mr-9"> {"\t"}</b><b className="mr-2"> {"\t"} Brand:</b>{item.item.distributor?.name} | <b className="mr-2">Brand:</b>{item.item.name} | <b className="mr-2">Year:</b>{item.item.model} | {"\t"} {"\t"} {"\t"} <b className="mr-2">Price:</b>${item.item.price * item.amount} 
                        </p>
                       
                    </div>
                </div>

                {/*Price and Quantity Div*/}
                <div className={PriceQuantityStyle}>
                    <div>
           
                    </div>
                    <p className="mr-2">
                        
                    </p>
                </div>

                <div className="flex mr-10">
                    <IconButton onClick={() => item.item.id && remove(item.item.id)}>
                        <ClearIcon />
                    </IconButton>
                </div>

            </div>


            <hr className="mb-3 mt-3 mobile:mt-0" />
        </>
    )
}