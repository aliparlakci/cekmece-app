import { useParams } from "react-router-dom"

import theme from "./theme"
import { ThemeProvider } from "@emotion/react"
import ReviewsButton from "./components/buttons/ReviewsButton"
import LeaveAReviewButton from "./components/buttons/LeaveAReviewButton"
import NavBar from "./components/NavBar"
import {Button} from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"


function CarDetailPage() {
    const params = useParams()
    const { carId } = params
    const averageRating = 4.5
    const reviewCount = 555

    return (
        <>
        <ThemeProvider theme={theme}>
            
<NavBar />
<div className="mt-20">
      <div className="flex justify-center mobile:flex-col mobile:mt-4 mobile:p-3">
        <div className="flex-1 flex items-center justify-center m-10">
          <img
            src="https://wallpaperaccess.com/full/8039043.jpg"
            className="product_img"
            alt="product_image"
          />
        </div>
        <div className="flex-[1.3] flex flex-col items-start w-32 justify-items-center mt-10 mobile:items-center">
        <h1 className="title text-[40px] mobile:text-[30px]">
            Porsche 
          </h1>
          <h1 className="title text-[40px] mobile:text-[30px]">
            <b> 911 GT3 Touring</b>
          </h1>
          <p className="pr-[4rem] text-justify mt-4 mobile:pr-0">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
            accusamus, culpa neque ex sunt placeat. Vitae quia qui quo,
            doloribus dolore aliquam veniam. Natus totam odit consequatur
            consectetur delectus nihil!
          </p>
          <div className="flex flex-col place-self-start">
            <p className="mt-7 text-3xl">
              Price: <b>$206.000</b>
            </p>

            <div className="mt-7">
              
            </div>
          </div>
            <div className="flex ">

            </div>
          <Button endIcon={<AddShoppingCartIcon />} className="text-white bg-[#000] shadow-md mt-[30px] p-3">
            Add to Cart
          </Button>
          <ReviewsButton carId={carId} averageRating={averageRating} reviewCount={reviewCount} />
          <LeaveAReviewButton carId={carId} />
        </div>
      </div>
    </div>
           
        </ThemeProvider>
        </>
    )
}

export default CarDetailPage
