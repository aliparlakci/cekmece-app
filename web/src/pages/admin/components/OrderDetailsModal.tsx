import React, { useEffect, useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import useNotification, { NOTIFICATON_TYPES } from "../../../hooks/useNotification"
import { mutate } from "swr"
import IOrder from "../../../models/order"

interface OrderDetailsModalProps {
    open: boolean
    onClose: () => any
    orderId?: number
}

function OrderDetailsModal({ open, onClose, orderId }: OrderDetailsModalProps) {
    const [order, setOrder] = useState<IOrder>("")
    const [loading, setLoading] = useState(false)
    const notification = useNotification()

    const fetchOrder = async (id: number) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/orders/${id}`)
            if (response.status !== 200)
                throw `Server responded with ${response.status}`
            const data = await response.json()

            setOrder(data)
        } catch (err) {
            notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(err))
        }
        setLoading(false)
    }

    useEffect(() => {
        if (orderId)
            fetchOrder(orderId)
    }, [orderId])

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <div style={{ minWidth: "30rem" }}>
                    <DialogContent>
                        <p>Status: {order.status}</p>
                        <br />
                        {order && order.orderItems.map(item => <p>{item.car.distributor?.name} {item.car.name} -
                            ${item.total}</p>)}
                        <br />
                        <p>Subtotal: ${order.subTotal}</p>
                        <p>Shipping: ${order.shipping}</p>
                        <p>Total: ${order.total}</p>
                    </DialogContent>
                    <DialogActions>
                        <a target="_blank" href={`http://localhost:5001/api/orders/invoice/${orderId}`}>
                            <Button disabled={loading}>
                                View Invoice
                            </Button>
                        </a>
                        <Button onClick={onClose} disabled={loading}>
                            Close
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    )
}

export default OrderDetailsModal
