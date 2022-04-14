import React from "react"
import { Box, createTheme, InputAdornment, TextField, ThemeProvider, Typography } from "@mui/material"

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})

interface PriceSelectProps {
    minPrice?: string
    maxPrice?: string
    onMinPriceChange: (value: string) => any
    onMaxPriceChange: (value: string) => any
}

export default function PriceSelect({ minPrice, maxPrice, onMinPriceChange, onMaxPriceChange }: PriceSelectProps) {
    return (
        <ThemeProvider theme={theme}>
            <Box
                component="form"
                sx={{
                    display: "flex", alignItems: "baseline", justifyContent: "center",
                }}
                noValidate
                autoComplete="off"
                marginTop={1}
            >
                <TextField value={minPrice} onChange={(event) => onMinPriceChange(event.target.value)} label="Min"
                           size="small" margin="normal" sx={{ marginRight: 1 }}
                           InputProps={{ endAdornment: <InputAdornment position="end">K$</InputAdornment> }} />
                <Typography variant="h6" sx={{ fontWeight: "light" }}>-</Typography>
                <TextField value={maxPrice} onChange={(event) => onMaxPriceChange(event.target.value)} label="Max"
                           size="small" margin="normal" sx={{ marginLeft: 1 }}
                           InputProps={{ endAdornment: <InputAdornment position="end">K$</InputAdornment> }} />
            </Box>
        </ThemeProvider>
    )
}
