import React from "react";
import Counter from "./Counter";
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from "@mui/material";

export default function ProductSection() {
  const SummaryItemStyle = "SummaryItem flex justify-between mt-3 w-[100%]";
  const ProductDivStyle = "flex w-[100%] h-auto items-center mobile:flex-col";
  const PriceQuantityStyle = "flex-auto flex flex-col justify-center items-center mobile:mt-7 mobile:mb-7";
  return (
    <>
    <div className={ProductDivStyle}>
              <div className=" product flex pl-5 self-start">
                <img
                  className="product_img w-auto h-[7rem]"
                  src="https://wallpaperaccess.com/full/8039043.jpg"
                  alt="product_img"
                />

                <div className="disc flex items-start justify-between h-auto flex-col ml-6">
                  <p>
                    <b className="mr-2">Brand:</b>Porsche
                  </p>
                  <p>
                    <b className="mr-2">Model:</b>911 GT3 Touring
                  </p>
                  <p className="flex items-center justify-center">
                    <b className="mr-2">Color:</b>
                    <div className="colorSelect bg-gray-500 ml-1 w-[20px] h-[20px]"></div>
                  </p>
                  <p>
                    <b className="mr-2">Year:</b>2022
                  </p>
                </div>
              </div>

              {/*Price and Quantity Div*/}
            <div className={PriceQuantityStyle}>
                <Counter />
                <p className="flex items-center justify-center text-4xl mt-3">
                  <b>$206.000</b>
                </p>
              </div>

            <div className="flex mr-10">
              <IconButton>
                <ClearIcon />
              </IconButton>
            </div>

            </div>


            <hr className="mb-7 mt-7 mobile:mt-0" />
            </>
  )
}