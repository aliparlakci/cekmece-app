import React, { useEffect, useState } from "react"
import { mutate } from "swr"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import useNotification, { NOTIFICATON_TYPES } from "../../../hooks/useNotification"
import IOrderItem from "../../../models/orderItem"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { SelectChangeEvent } from "@mui/material/Select"

interface NewCateogryDialogProps {
    open: boolean
    onClose: () => any
    update?: number
}

function SetDeliveryDialog({ open, onClose, update }: NewCateogryDialogProps) {
    const [orderItem, setOrderItem] = useState<IOrderItem>()
    const [status, setStatus] = useState<"processing" | "in-transit" | "delivered">("processing")
    const [loading, setLoading] = useState(false)
    const notification = useNotification()

    const fetchOrder = async (id: number) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/orders/item/${id}`)
            if (response.status !== 200)
                throw `Server responded with ${response.status}`
            const data: IOrderItem = await response.json()

            setOrderItem(data)
            setStatus(data.status)
        } catch (err) {
            notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(err))
        }
        setLoading(false)
    }

    useEffect(() => {
        if (update)
            fetchOrder(update)
    }, [update])

    const handleCreate = async () => {
        console.log({ update })
        setLoading(true)
        if (orderItem === undefined) {
            setLoading(false)
            return
        }

        try {
            const response = await fetch(`/api/orders/item/${update}`, {
                method: "PATCH",
                body: JSON.stringify({
                    status: status
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response.status !== 200) throw `Something happened`
        } catch (err) {
            notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(err))
        }

        notification(NOTIFICATON_TYPES.SUCCESS, "Status successfully updated!")
        mutate("/api/orders/all")

        setLoading(false)
        onClose()
    }

    const onChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as "processing" | "in-transit" | "delivered")
    }

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Age"
                            onChange={onChange}
                        >
                            <MenuItem value="processing">Processing</MenuItem>
                            <MenuItem value="in-transit">In-transit</MenuItem>
                            <MenuItem value="delivered">Delivered</MenuItem>
                        </Select>
                    </FormControl>
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

export default SetDeliveryDialog
