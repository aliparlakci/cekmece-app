import React from "react"
import {
    Box,
    createTheme,
    ThemeProvider,
    Slider,
    Typography
} from "@mui/material"
import { constants } from "perf_hooks";

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

const minDistance = 1;

interface IYearSliderProps {
    minYear?: number
    maxYear?: number
    onChange: (min: number, max: number) => void
}

export default function YearSlider({ minYear, maxYear, onChange }: IYearSliderProps) {
    const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return
        }

        let min, max
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 2022 - minDistance)
                min = clamped
                max = clamped + minDistance
            } else {
                const clamped = Math.max(newValue[1], minDistance)
                min = clamped - minDistance
                max = clamped
            }
            onChange(min, max)
        } else {
            onChange(newValue[0], newValue[1])
        }
    }

    return (
            <ThemeProvider theme={theme}>
              <Box sx={{display:"flex",  alignItems: "center", justifyContent: "space-between", marginTop:2}} >
              <Typography variant="h6" sx={{ fontWeight:"light" }}>{minYear}</Typography>
                <Slider
                    getAriaLabel={() => "Minimum distance shift"}
                    value={[minYear || 2000, maxYear || 2022]}
                    onChange={handleChange}
                    disableSwap
                    sx = {{ marginX:2 }}
                    min={2000}
                    max={2022}
                />
                <Typography variant="h6" sx={{ fontWeight:"light" }}>{maxYear}</Typography>
              </Box>
            </ThemeProvider>
    )
}
