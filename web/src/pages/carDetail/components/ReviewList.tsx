import { useEffect, useState, Fragment } from "react"
import useSWR from "swr"
import fetcher from "../../../utils/fetcher"
import IReview from "../../../models/review"
import { List, Divider } from "@mui/material"
import { StarOutlineSharp, StarSharp } from "@mui/icons-material"
import date from "date-and-time"
import ReadMore from "./ReadMore"
import ReviewTile from "./ReviewTile"

type Car = {
    carId: number
}

export default function ReviewList({ carId }: Car) {
    const { data, error } = useSWR<IReview[]>(`/api/cars/${carId}/reviews`, fetcher)

    if (!data) return <></>

    if (data.length == 0) {
        return <div>NO REVIEWS, SAD!</div>
    }

    return (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {data.map((review, index) => (
                <Fragment>
                    <ReviewTile
                        key={index}
                        rating={review.rating}
                        comment={review.comment}
                        createdDate={review.createdDate}
                        isApproved={review.isApproved}
                    />
                    {index != data.length - 1 ? <Divider component="li" /> : null}
                </Fragment>
            ))}
        </List>
    )
}
