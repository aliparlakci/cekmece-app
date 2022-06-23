import { Box } from "@mui/material"
import React, { useState } from "react"
import useSWR, { mutate } from "swr"
import fetcher from "../../../utils/fetcher"
import Links from "./Links"
import IRefundRequest from "../../../models/refundRequest"
import useNotification, { NOTIFICATON_TYPES } from "../../../hooks/useNotification"
import { ref } from "yup"

export default function RefundsListView() {
    const nofitication = useNotification()
    const [loading, setLoading] = useState(false)
    const { data: refundRequests } = useSWR<IRefundRequest[]>("/api/orders/refundRequests", fetcher)

    const approveRefund = async (refundRequestId) => {
        setLoading(true)
        try {
            await fetch(`/api/orders/approveRefund/${refundRequestId}`, { method: "POST" })
            mutate("/api/orders/refundRequests")
        } catch {
            nofitication(NOTIFICATON_TYPES.ERROR,"Cannot approve")
        } finally {
            setLoading(false)
        }
    }

    const disapproveRefund = async (refundRequestId) => {
        setLoading(true)
        try {
            await fetch(`/api/orders/disapproveRefund/${refundRequestId}`, { method: "POST" })
            mutate("/api/orders/refundRequests")
        } catch {
            nofitication(NOTIFICATON_TYPES.ERROR,"Cannot disapprove")
        } finally {
            setLoading(false)
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
                                {/*<thead className="bg-gray-50">*/}
                                {/*<tr>*/}
                                {/*    <th scope="col"*/}
                                {/*        className="w-2/12 sm:pl-6 sm:pl-10 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">*/}
                                {/*        Name*/}
                                {/*    </th>*/}
                                {/*    <th scope="col"*/}
                                {/*        className="w-2/12 px-5 py-3.5 text-left text-sm font-semibold text-gray-900">*/}
                                {/*        Product*/}
                                {/*    </th>*/}
                                {/*</tr>*/}
                                {/*</thead>*/}
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {refundRequests && refundRequests.map((refundRequest, i) => (
                                    <tr key={i}>
                                        <td className="w-1/12 whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                            { refundRequest.isApproved &&
                                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold leading-5 text-green-800">
                                                    Accepted
                                                </span>
                                            }
                                            { refundRequest.isRejected &&
                                                <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold leading-5 text-red-800">
                                                    Rejected
                                                </span>
                                            }
                                            { !refundRequest.isRejected && !refundRequest.isApproved &&
                                                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold leading-5 text-gray-800">
                                                    Pending
                                                </span>
                                            }
                                        </td>
                                        <td className="w-2/12 whitespace-nowrap py-4  pr-3 text-sm sm:pl-6">
                                            <div className="flex ">
                                                <div className="ml-2">
                                                    <div className="text-gray-900">{refundRequest.orderItem.order.user.displayName}</div>
                                                    <div className="text-gray-500">{refundRequest.orderItem.order.user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="w-2/12 whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                                            <div className="text-gray-900">{refundRequest.orderItem.car.distributor?.name} {refundRequest.orderItem.car.name}</div>
                                        </td>
                                        <td className="w-2/12 whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                                            <div className="text-gray-900">${refundRequest.orderItem.total}</div>
                                        </td>
                                        <td className="w-2/12 whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                                            <div className="text-gray-900">{(new Date(refundRequest.orderItem.order.createdDate)).toDateString()}</div>
                                        </td>
                                        {/* <td className="w-5/12 whitespace-nowrap px-5 py-4 text-sm text-gray-500"> */}
                                        <td className="w-1/12 relative whitespace-nowrap px-3 py-4 text-center text-sm font-medium">
                                            <div className="flex gap-4">
                                            {
                                                !refundRequest.isRejected && !refundRequest.isApproved && <>
                                                    <button disabled={loading} className="text-indigo-600 hover:text-indigo-900" onClick={() => approveRefund(refundRequest.id)}>
                                                        Approve
                                                    </button>
                                                    <button disabled={loading} className="text-red-600 hover:text-red-900" onClick={() => disapproveRefund(refundRequest.id)}>
                                                        Disapprove
                                                    </button>
                                                </>
                                            }
                                            </div>
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


