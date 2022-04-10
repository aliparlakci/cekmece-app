import React from "react"
import {
    Box,
    createTheme,
    ThemeProvider,
    Slider,
    Typography
} from "@mui/material"

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
});

function valuetext(value: number) {
    return `${value}`
}

const minDistance = 10

export default function YearSlider() {
    const [value2, setValue2] = React.useState<number[]>([0, 100])

    const handleChange2 = (event: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance)
                setValue2([clamped, clamped + minDistance])
            } else {
                const clamped = Math.max(newValue[1], minDistance)
                setValue2([clamped - minDistance, clamped])
            }
        } else {
            setValue2(newValue as number[])
        }
    }

    return (

            <ThemeProvider theme={theme}>
              <Box sx={{display:"flex",  alignItems: "center", justifyContent: "space-between", marginTop:2}} >
              <Typography variant="h6" sx={{ fontWeight:"light" }}>2000</Typography>
                <Slider
                    getAriaLabel={() => "Minimum distance shift"}
                    value={value2}
                    onChange={handleChange2}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                    sx = {{ marginX:2 }}
                />
                <Typography variant="h6" sx={{ fontWeight:"light" }}>2022</Typography>
              </Box>
            </ThemeProvider>
    )
}
