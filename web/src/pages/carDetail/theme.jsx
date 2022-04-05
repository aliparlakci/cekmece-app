import { createTheme } from "@mui/material"

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: "Raleway",
        },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
    },
})

export default theme
