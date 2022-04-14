import React, { useEffect, useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { mutate } from "swr"

import useNotification, { NOTIFICATON_TYPES } from "../../../hooks/useNotification"

interface NewDistributorDialogProps {
    open: boolean
    onClose: () => any
    update?: number
}

function NewDistributorDialog({ open, onClose, update }: NewDistributorDialogProps) {
    const [distributorName, setDistributorName] = useState("")
    const [loading, setLoading] = useState(false)
    const notification = useNotification()

    const fetchDistributor = async (id: number) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/distributors/${id}`)
            if (response.status !== 200)
                throw `Server responded with ${response.status}`
            const data = await response.json()

            setDistributorName(data.name)
        } catch (err) {
            notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(err))
        }
        setLoading(false)
    }

    useEffect(() => {
        if (update)
            fetchDistributor(update)
    }, [update])

    const handleCreate = async () => {
        setLoading(true)
        try {
            const endpoint = update ? "/api/distributors/update" : "/api/distributors/new"
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: update ? update : undefined,
                    name: distributorName,
                }),
            })

            if (response.status === 200 || response.status === 201) {
                notification(NOTIFICATON_TYPES.SUCCESS, "Distributor saved!")
                if (onClose) onClose()
                mutate("/api/distributors")
            } else {
                throw `Cannot save the distributor`
            }
        } catch (err) {
            notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(err))
        }

        setLoading(false)
        setDistributorName("")
    }

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Register a new distributor</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Distributor Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={distributorName}
                        onChange={(event) => setDistributorName(event.target.value)}
                        disabled={loading}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} disabled={loading}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default NewDistributorDialog
