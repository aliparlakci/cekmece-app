import { createTheme } from "@mui/material"

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
    },
    
    palette: {
        primary: {
            main: "#000000",
        },
    },
})

export default theme
