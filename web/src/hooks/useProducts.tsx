import React from "react"
import useSWR from "swr"

import ICar from "../models/car"
import fetcher from "../utils/fetcher"
 
export default function useProducts() {
    const { data, error } = useSWR<ICar[]>("/api/cars", fetcher)

    return { data, error }
}
