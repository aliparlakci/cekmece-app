import React, { useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

interface NewCateogryDialogProps {
    open: boolean
    onClose: () => any
}

function NewCategoryDialog({ open, onClose }: NewCateogryDialogProps) {
    const [categoryName, setCategoryName] = useState("")

    const handleCreate = () => {
        fetch("/api/categories/new", {
            method: "POST",
            body: JSON.stringify({
                name: categoryName,
            }),
        })
    }

    return (
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
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleCreate}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewCategoryDialog
