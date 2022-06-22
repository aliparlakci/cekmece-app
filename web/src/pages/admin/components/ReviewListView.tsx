import { Link } from "react-router-dom"
import { Box, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import useSWR, { mutate } from "swr"
import fetcher from "../../../utils/fetcher"
import Links from "./Links"


const people = [
    {
        date: "12/12/2022",
        name: "Lindsay Walton",
        email: "lindsay.walton@example.com",
        product: "BMW 420i",
        description: "ızgarası bazen guzel geliyo bazen gelmiyo. siz bilirsiniz.",
        comment: "Beauty is an opinion... but for sure this is different. People complain about cars w/o personality... it has a lot, as exterior, interior, and the awesome powertrain. The M420i is fantastic to drive, ready, quick and efficient too",
        status: "true",
    },
    // More people...
]

export default function ReviewListView() {
    const { data: reviews } = useSWR("/api/cars/0/reviews/unapproved", fetcher)

    const approveReview = async (reviewId, carId) => {
        try {
            await fetch(`/api/cars/${carId}/reviews/${reviewId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    approvalStatus: "approved"
                })
            })
            mutate("/api/cars/0/reviews/unapproved")
        } catch {
            console.log("Cannot approve")
        }
    }

    const disapproveReview = async (reviewId, carId) => {
        try {
            await fetch(`/api/cars/${carId}/reviews/${reviewId}`, {
                method: "DELETE",
            })
            mutate("/api/cars/0/reviews/unapproved")
        } catch {
            console.log("Cannot disapprove")
        }
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <Box
                    sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}
                    paddingY={2}
                >
                    <Links />
                    <div></div>
                </Box>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="w-1/12 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Date
                                    </th>
                                    <th scope="col"
                                        className="w-2/12 sm:pl-6 sm:pl-10 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Name
                                    </th>
                                    <th scope="col"
                                        className="w-2/12 px-5 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Product
                                    </th>
                                    <th scope="col"
                                        className="w-5/12 py-3.5 pr-5 text-left text-sm font-semibold text-gray-900 sm:pl-5">
                                        Comment
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {reviews && reviews.map((review, i) => (
                                    <tr key={i}>
                                        <td className="w-1/12 whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">{(new Date(review.createdDate).toLocaleDateString())}</td>
                                        <td className="w-2/12 whitespace-nowrap py-4  pr-3 text-sm sm:pl-6">
                                            <div className="flex ">
                                                <div className="ml-2">
                                                    <div className="text-gray-900">{review.user.name}</div>
                                                    <div className="text-gray-500">{review.user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="w-2/12 whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                                            <div className="text-gray-900">{review.car.name}</div>
                                            <div className="text-gray-500">{review.car.description}</div>
                                        </td>
                                        {/* <td className="w-5/12 whitespace-nowrap px-5 py-4 text-sm text-gray-500"> */}
                                        <td className="w-5/12 py-3.5 pr-5 text-left text-sm  sm:pl-5">
                                            <div className="text-gray-500">{review.comment}</div>
                                        </td>

                                        <td className="w-1/12 whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {/*                      {person.status === "true" ? <span*/}
                      {/*                          className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold leading-5 text-green-800">*/}
                      {/*    Accepted*/}
                      {/*  </span> : person.status === "false" ? <span*/}
                      {/*                              className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-semibold leading-5 text-red-800">*/}
                      {/*    Rejected*/}
                      {/*  </span> :*/}
                      {/*                          <span*/}
                      {/*                              className="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold leading-5 text-gray-800">*/}
                      {/*  Pending*/}
                      {/*</span>}*/}
                                        </td>
                                        <td className="w-1/12 relative whitespace-nowrap py-4 text-center text-sm font-medium flex gap-4">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={() => approveReview(review.id, review.car.id)}>
                                                Approve
                                            </a>
                                            <a href="#" className="text-red-600 hover:text-red-900" onClick={() => disapproveReview(review.id, review.car.id)}>
                                                Disapprove
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


