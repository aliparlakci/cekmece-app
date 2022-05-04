import React from "react";
import NavBar from "./components/NavBar";
import Counter from "./components/Counter";
import { Box, Button, createTheme, ThemeProvider, Typography } from "@mui/material";
import ProductSection from "./components/ProductSection";

const theme = createTheme({
  palette: {
      primary: {
          main: "#000000",
      },
  },
})

export default function CartPage () {
  const SummaryItemStyle = "SummaryItem flex justify-between mt-3 w-[100%]";
  const ProductDivStyle = "flex w-[100%] h-auto items-center mobile:flex-col";
  const PriceQuantityStyle = "flex-auto flex flex-col justify-center items-center mobile:mt-7 mobile:mb-7";
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
            <Typography variant="h4">Cart:</Typography>
          </div>          
        </div>

        {/* vertically center parent div */}
        <div className="flex flex-row mt-7 mobile:flex-col">
          {/* product div */}
          <div className="flex flex-col flex-1">
            {/* Product Sections Below */}
            <ProductSection/>
            
          </div>
          <div className="Summary flex-[0.4] flex flex-col items-center w-auto h-auto border-2 border-[#000] ml-6 mr-6 p-5 shadow-lg text-lg mobile:mb-6">
            <h1 className="text-[2rem]">SUMMARY</h1>
            <div className={SummaryItemStyle}>
              <p>SubTotal:</p>
              <p>$206.000</p>
            </div>
            <div className={SummaryItemStyle}>
              <p>Shipping:</p>
              <p>$10</p>
            </div>
            <div className={SummaryItemStyle}>
              <p>Discount:</p>
              <p>-$10</p>
            </div>
            <div className={SummaryItemStyle + " text-3xl font-bold"}>
              <p>Total:</p>
              <p>$206.000</p>
            </div>
            
            <Box className="w-[100%] mt-20">
              <Button variant="contained" fullWidth={true} sx={{ borderRadius: 0 }}>
                Checkout
              </Button>
            </Box>
          </div>
          </div>
        </div>
      </div>
      </ThemeProvider>
      </>
  )
}
