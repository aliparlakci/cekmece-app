import React, { useEffect, useState } from "react"
import useSWR, { mutate } from "swr"
import Button from "@mui/material/Button"
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from "@mui/material"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Box } from "@mui/system"

import useNotification, { NOTIFICATON_TYPES } from "../../../hooks/useNotification"
import fetcher from "../../../utils/fetcher"
import ICategory from "../../../models/category"
import IDistributor from "../../../models/distributor"

interface NewCarDialogProps {
    open: boolean
    onClose: () => any
    update?: number
}

const defaultState = Object.freeze({
    id: 0,
    distributor: "0",
    name: "",
    model: "2022",
    category: "0",
    quantity: "1",
    warranty: "1",
    price: "0",
    number: "1",
})

function NewCarDialog({ open, onClose, update }: NewCarDialogProps) {
    const [input, setInput] = useState(defaultState)
    const [loading, setLoading] = useState(false)

    const notification = useNotification()

    const { data: distributors } = useSWR<IDistributor[]>("/api/distributors", fetcher)
    const { data: categories } = useSWR<ICategory[]>("/api/categories", fetcher)

    const fetchCar = async (id: number) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/cars/${id}`)
            const data = await response.json()

            setInput({
                id: data.id,
                distributor: data.distributor.id,
                name: data.name,
                model: data.model,
                category: data.category.id,
                quantity: data.quantity,
                warranty: data.warranty,
                price: data.price,
                number: data.number,
            })

            setLoading(false)
        } catch (err) {
            notification(NOTIFICATON_TYPES.ERROR, JSON.stringify(err))
            setLoading(false)
            onClose()
        }
    }

    useEffect(() => {
        if (update) {
            fetchCar(update)
        }
    }, [update])

    const handleCreate = async (event: any) => {
        event.preventDefault()

        setLoading(true)
        try {
            const endpoint = update ? "/api/cars/update" : "/api/cars/new" 
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: input.id === 0 ? undefined : input.id,
                    distributor: input.distributor,
                    name: input.name,
                    model: input.model,
                    category: input.category,
                    quantity: input.quantity,
                    warranty: input.warranty,
                    price: input.price,
                    number: input.number,
                }),
            })

            if (response.status === 201 || response.status === 200) {
                notification(NOTIFICATON_TYPES.SUCCESS, "Car saved!")
                setInput(defaultState)
                if (onClose) onClose()
                mutate("/api/cars")
            } else {
                throw `Cannot save the new car`
            }
        } catch (err) {
            if (typeof err == "string") notification(NOTIFICATON_TYPES.ERROR, err)
        }
        setLoading(false)
    }

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <Box sx={{ minWidth: "30rem" }}>
                    <form onSubmit={handleCreate}>
                        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="distributor">Distributor</InputLabel>
                                <Select
                                    labelId="distributor-label"
                                    id="distributor"
                                    label="Distributor *"
                                    value={input.distributor}
                                    onChange={(event) =>
                                        setInput((state) => ({ ...state, distributor: event.target.value }))
                                    }
                                >
                                    {distributors &&
                                        distributors.map((category) => (
                                            <MenuItem value={category.id} key={category.id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    disabled={loading}
                                    value={input.name}
                                    onChange={(event) => setInput((state) => ({ ...state, name: event.target.value }))}
                                />
                            </FormControl>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Model"
                                    type="number"
                                    defaultValue={2022}
                                    fullWidth
                                    disabled={loading}
                                    value={input.model}
                                    onChange={(event) => setInput((state) => ({ ...state, model: event.target.value }))}
                                />
                            </FormControl>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="category">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category"
                                    label="Category *"
                                    value={input.category}
                                    onChange={(event) =>
                                        setInput((state) => ({ ...state, category: event.target.value }))
                                    }
                                >
                                    {categories &&
                                        categories.map((category) => (
                                            <MenuItem value={category.id} key={category.id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="warranty"
                                    label="Warranty"
                                    type="number"
                                    defaultValue={1}
                                    fullWidth
                                    disabled={loading}
                                    value={input.warranty}
                                    onChange={(event) =>
                                        setInput((state) => ({ ...state, warranty: event.target.value }))
                                    }
                                />
                            </FormControl>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="stocks"
                                    label="Stocks"
                                    type="number"
                                    defaultValue={1}
                                    fullWidth
                                    disabled={loading}
                                    value={input.quantity}
                                    onChange={(event) =>
                                        setInput((state) => ({ ...state, quantity: event.target.value }))
                                    }
                                />
                            </FormControl>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="price"
                                    label="Price"
                                    inputProps={{
                                        step: "1000",
                                    }}
                                    type="number"
                                    defaultValue={0}
                                    fullWidth
                                    disabled={loading}
                                    value={input.price}
                                    onChange={(event) => setInput((state) => ({ ...state, price: event.target.value }))}
                                />
                            </FormControl>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="number"
                                    label="Number"
                                    type="number"
                                    fullWidth
                                    disabled={loading}
                                    value={input.number}
                                    onChange={(event) =>
                                        setInput((state) => ({ ...state, number: event.target.value }))
                                    }
                                />
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={onClose} disabled={loading}>
                                Cancel
                            </Button>
                            <Button onClick={handleCreate} disabled={loading} type="submit">
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </Box>
            </Dialog>
        </>
    )
}

export default NewCarDialog
