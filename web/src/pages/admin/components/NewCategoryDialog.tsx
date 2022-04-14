import React, { useEffect, useState } from "react"
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
    update?: number
}

function NewCategoryDialog({ open, onClose, update }: NewCateogryDialogProps) {
    const [categoryName, setCategoryName] = useState("")
    const [loading, setLoading] = useState(false)
    const notification = useNotification()

    const fetchCategory = async (id: number) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/categories/${id}`)
            if (response.status !== 200)
                throw `Server responded with ${response.status}`
            const data = await response.json()

            setCategoryName(data.name)
        } catch (err) {
            notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(err))
        }
        setLoading(false)
    }

    useEffect(() => {
        if (update)
            fetchCategory(update)
    }, [update])

    const handleCreate = async () => {
        console.log({ update })
        setLoading(true)
        try {
            const endpoint = update ? "/api/categories/update" : "/api/categories/new"
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: update ? update : undefined,
                    name: categoryName,
                }),
            })

            if ([200, 201].includes(response.status)) {
                notification(NOTIFICATON_TYPES.SUCCESS, "Category saved!")
                if (onClose) onClose()
                mutate("/api/categories")
            } else {
                throw `Cannot save the category`
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
