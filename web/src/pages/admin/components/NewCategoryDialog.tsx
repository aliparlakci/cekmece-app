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

function NewCategoryDialog({ open, onClose }: NewCateogryDialogProps) {
    const [categoryName, setCategoryName] = useState("")
    const [loading, setLoading] = useState(false)
    const notification = useNotification()

    const handleCreate = async () => {
        setLoading(true)
        try {
            const response = await fetch("/api/categories/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: categoryName,
                }),
            })

            if (response.status === 201) {
                notification(NOTIFICATON_TYPES.SUCCESS, "Category created!")
                if (onClose) onClose()
                mutate("/api/categories")
            } else {
                throw `Cannot create a new category`
            }
        } catch (err) {
            notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(err))
        }

        setLoading(false)
        setCategoryName("")
    }

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Register a new category</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Category Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={categoryName}
                        onChange={(event) => setCategoryName(event.target.value)}
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

export default NewCategoryDialog
