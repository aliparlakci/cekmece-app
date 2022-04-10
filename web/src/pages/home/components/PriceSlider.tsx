import React from "react"
import {
    createTheme,
    ThemeProvider,
    Slider,
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

export default function PriceSlider() {
    const [value2, setValue2] = React.useState<number[]>([20, 37])

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
                <Slider
                    getAriaLabel={() => "Minimum distance shift"}
                    value={value2}
                    onChange={handleChange2}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                />
            </ThemeProvider>
    )
}
