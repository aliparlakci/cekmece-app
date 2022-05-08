import React, { createContext, useContext, useState } from "react"
import { Snackbar, Alert } from "@mui/material"
import { createTheme } from "@mui/material"
import { ThemeProvider } from "@emotion/react"

type IUseNotification = (type: NOTIFICATON_TYPES, message: string) => void

const context = createContext<IUseNotification>(() => null)

export enum NOTIFICATON_TYPES {
    ERROR = "error",
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
}

const fontTheme = createTheme({
    typography: {
        allVariants: {
            fontFamily: "Raleway",
        },
    },
})

export function NotificationProvider({ children }: any) {
    const [open, setOpen] = useState(false)
    const [type, setType] = useState<NOTIFICATON_TYPES>(NOTIFICATON_TYPES.INFO)
    const [message, setMessage] = useState("")

    const show: IUseNotification = (t: NOTIFICATON_TYPES, m) => {
        setType(t)
        setMessage(m)
        setOpen(true)
    }

    return (
        <context.Provider value={show}>
            <ThemeProvider theme={fontTheme}>
                <Snackbar
                    open={open}
                    autoHideDuration={5000}
                    onClose={() => setOpen(false)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert onClose={() => setOpen(false)} severity={type} sx={{ width: "100%" }}>
                        {message}
                    </Alert>
                </Snackbar>
                {children}
            </ThemeProvider>
        </context.Provider>
    )
}

const useNotification = () => useContext(context)

export default useNotification
