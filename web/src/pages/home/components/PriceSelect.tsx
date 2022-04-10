import React from "react"
import { Box, createTheme, InputAdornment, TextField, ThemeProvider, Typography} from "@mui/material"

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})

export default function PriceSelect() {


    return (
        <ThemeProvider theme={theme}>
            <Box
                component="form"
                sx={{
                  display:"flex",  alignItems: "baseline", justifyContent: "center"
                }}
                noValidate
                autoComplete="off"
                marginTop={1}
            >
                <TextField label="Min" size="small" margin="normal" sx={{ marginRight:1 }} InputProps={{endAdornment: <InputAdornment position="end">K$</InputAdornment>, }}/>
                <Typography variant="h6" sx={{ fontWeight:"light" }}>-</Typography>
                <TextField label="Max" size="small" margin="normal" sx={{ marginLeft:1 }} InputProps={{endAdornment: <InputAdornment position="end">K$</InputAdornment>, }}/>
            </Box>
        </ThemeProvider>
    )
}
