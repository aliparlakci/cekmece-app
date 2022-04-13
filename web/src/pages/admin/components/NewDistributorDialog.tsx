import React, { useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import useNotification, { NOTIFICATON_TYPES } from "../../../hooks/useNotification"
import { mutate } from "swr"

interface NewCateogryDialogProps {
    open: boolean
    onClose: () => any
}

function NewDistributorDialog({ open, onClose }: NewCateogryDialogProps) {
    const [distributorName, setDistributorName] = useState("")
    const [loading, setLoading] = useState(false)
    const notification = useNotification()

    const handleCreate = async () => {
        setLoading(true)
        try {
            const response = await fetch("/api/distributors/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: distributorName,
                }),
            })

            if (response.status === 201) {
                notification(NOTIFICATON_TYPES.SUCCESS, "Distributor created!")
                if (onClose) onClose()
                mutate("/api/distributors")
            } else {
                throw `Cannot create a new distributor`
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
