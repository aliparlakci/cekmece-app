import React, { useEffect, useState } from "react"
import { mutate } from "swr"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import useNotification, { NOTIFICATON_TYPES } from "../../../hooks/useNotification"
import ICar from "../../../models/car"

interface NewCateogryDialogProps {
    open: boolean
    onClose: () => any
    update?: number
}

function SetDiscountsDialog({ open, onClose, update }: NewCateogryDialogProps) {
    const [car, setCar] = useState<ICar>()
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [loading, setLoading] = useState(false)
    const notification = useNotification()

    const fetchCar = async (id: number) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/cars/${id}`)
            if (response.status !== 200)
                throw `Server responded with ${response.status}`
            const data: ICar = await response.json()

            setCar(data)
            setPrice(data.price)
            setDiscount(data.discount)
        } catch (err) {
            notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(err))
        }
        setLoading(false)
    }

    useEffect(() => {
        if (update)
            fetchCar(update)
    }, [update])

    const handleCreate = async () => {
        console.log({ update })
        setLoading(true)
        if (car === undefined) {
            setLoading(false)
            return
        }

        try {
            const response1 = await fetch(`/api/cars/${car.id}/setPrice/${price}`, {
                method: "POST"
            })
            const response2 = await fetch(`/api/cars/${car.id}/setDiscount/${discount}`, {
                method: "POST"
            })
        } catch (err) {
            notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(err))
        }

        notification(NOTIFICATON_TYPES.SUCCESS, "Discount is succesfully set!")
        mutate("/api/cars")

        setLoading(false)
        setDiscount(0)
        setPrice(0)
        onClose()
    }

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Price"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={price}
                        onChange={(event) => setPrice(parseInt(event.target.value))}
                        disabled={loading}
                    />                    <TextField
                        autoFocus
                        margin="dense"
                        id="discount"
                        label="Discount amount (%)"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={discount}
                        onChange={(event) => setDiscount(parseInt(event.target.value))}
                        disabled={loading}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} disabled={loading}>
                        Set
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SetDiscountsDialog
