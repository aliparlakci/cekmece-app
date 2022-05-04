import { useParams } from "react-router-dom"
import theme from "./theme"
import { ThemeProvider } from "@emotion/react"
import ReviewsButton from "./components/buttons/ReviewsButton"
import LeaveAReviewButton from "./components/buttons/LeaveAReviewButton"
import NavBar from "./components/NavBar"
import {Button, TextField} from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import ICar from "../../models/car"
import Box from '@mui/material/Box';

function CarDetailPage() {
    const params = useParams()
    const { carId } = params
    const averageRating = 4.5
    const reviewCount = 555
    const quantity = 32

    return (
        <>
        <ThemeProvider theme={theme}>
            
<NavBar />
<div className="mt-20">
      <div className="flex justify-center mobile:flex-col mobile:mt-4 mobile:p-3">
        <div className="flex-1 flex-col items-center justify-center m-10">
          <img
            src="https://wallpaperaccess.com/full/8039043.jpg"
            className="product_img"
            alt="product_image"
          />
        <p className="mt-4 text-2xl"></p>
        <h6 className="title text-[20px] mobile:text-[10px]" >
            <u> Items in stock:</u> <b> {quantity} </b>
        </h6>
        </div>
        <div className="flex-[1.3] flex flex-col items-start w-32 justify-items-center mt-10 mobile:items-center">
        <h1 className="title text-[40px] mobile:text-[30px]">
            Porsche
          </h1>
          <h1 className="title text-[40px] mobile:text-[30px]">
            <b> 911 GT3 Touring</b>
          </h1>
          <ReviewsButton carId={carId} averageRating={averageRating} reviewCount={reviewCount} />
          <p className="pr-[4rem] text-justify mt-4 mobile:pr-0">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
            accusamus, culpa neque ex sunt placeat. Vitae quia qui quo,
            doloribus dolore aliquam veniam. Natus totam odit consequatur
            consectetur delectus nihil!
          </p>
          <div className="flex flex-col place-self-start">
            <p className="mt-4 text-2xl">
              Price: <b>$206.000</b>
            </p>
            <p className="mt-2 text-2xl">
              Year: <b>2022</b>
            </p>
            <p className="mt-2 text-2xl">
              Warranty: <b>2 Years</b>
            </p>
            <p className="mt-2 text-2xl">
              Vendor: <b>XYZCars</b>
            </p>
            
          </div>
            <div className="flex flex-row justify-start items-baseline gap-x-8 mt-5">
            <TextField
                focused
                defaultValue={1}
                label="Quantity"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ marginTop:2, width:80}}
            />

            <Button endIcon={<AddShoppingCartIcon />} className="text-white bg-[#000] p-3 mr-5" sx={{
                        minWidth: 250,
                        maxHeight: 35,
                        fontWeight: 700,
                        color: "white",
                        backgroundColor: "black",
                        ":hover": {
                            backgroundColor: "#2D2D2D",
                        },
                    }}>
            Add to Cart
            </Button>
          
            <LeaveAReviewButton carId={carId} />
            </div>

        </div>
      </div>
    </div>
           
        </ThemeProvider>
        </>
    )
}

export default CarDetailPage
