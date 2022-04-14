import React, { useState, useContext, createContext } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

type IUseConfirmation = (message: IMessage, onPositive?: () => any, onNegative?: () => any) => void

interface IMessage {
    title: string
    message: string
}

const context = createContext<IUseConfirmation>(() => null)

const defaultState = {
    title: "",
    message: "",
}

export function ConfirmationProvider({ children }: any) {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState<IMessage>(defaultState)
    const [onPositive, setOnPositive] = useState<() => any>(() => null)
    const [onNegative, setOnNegative] = useState<() => any>(() => null)

    const show: IUseConfirmation = (m, p, n) => {
        setMessage(m)
        setOnPositive(() => p)
        setOnNegative(() => n)
        setOpen(true)
    }

    const handlePositive = () => {
        if (onPositive) onPositive()
        setOpen(false)
        setMessage(defaultState)
    }

    const handleNegative = () => {
        if (onNegative) onNegative()
        setOpen(false)
        setMessage(defaultState)
    }

    return (
        <context.Provider value={show}>
            <Dialog
                open={open}
                onClose={handleNegative}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {message.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNegative}>Disagree</Button>
                    <Button onClick={handlePositive} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            {children}
        </context.Provider>
    )
}

const useConfirmation = () => useContext(context)

export default useConfirmation
