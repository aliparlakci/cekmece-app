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
const minYear = 2000;
const maxYear = 2022;

export default function YearSlider() {
    const [value, setValue] = React.useState<number[]>([minYear, maxYear])
    const [low, setLow] = React.useState(minYear)
    const [high, setHigh] = React.useState(maxYear)

    const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 2022 - minDistance)
                setValue([clamped, clamped + minDistance])
            } else {
                const clamped = Math.max(newValue[1], minDistance)
                setValue([clamped - minDistance, clamped])
            }
        } else {
            setValue(newValue as number[])
        }
            setLow(newValue[0]);
            setHigh(newValue[1]);

    }

    return (
            <ThemeProvider theme={theme}>
              <Box sx={{display:"flex",  alignItems: "center", justifyContent: "space-between", marginTop:2}} >
              <Typography variant="h6" sx={{ fontWeight:"light" }}>{low}</Typography>
                <Slider
                    getAriaLabel={() => "Minimum distance shift"}
                    value={value}
                    onChange={handleChange}
                    disableSwap
                    sx = {{ marginX:2 }}
                    min={minYear}
                    max={maxYear}

                />
                <Typography variant="h6" sx={{ fontWeight:"light" }}>{high}</Typography>
              </Box>
            </ThemeProvider>
    )
}
