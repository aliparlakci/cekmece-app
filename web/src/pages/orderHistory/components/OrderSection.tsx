import React from "react"
import { Box, Button, Paper, createTheme, ThemeProvider, Typography } from "@mui/material"



const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})


export default function OrderSection() {
    return (
        <>
            <ThemeProvider theme={theme}>
              <div className="max-w-screen-lg py-5 px-16 mb-10 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
              <Paper elevation={0} sx={{ borderRadius:0 }}>
                  <Box className="grid grid-cols-5 gap-6">
                    <Box>
                      <Typography sx={{ color:"#AAAAAA" }}>#00000001</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{  }}>21/04/2022</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{  }}>$206.000</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{  }}>Shipping</Typography>
                    </Box>
                    <Box className="flex flex-row">
                      <Typography sx={{ color:"#ffc107" }}>Return&emsp;</Typography>
                      <Typography sx={{ color:"#AAAAAA" }} className="m-4">|</Typography>
                      <Typography sx={{ color:"#f44336" }}>&emsp;Cancel</Typography>
                    </Box>
                  </Box>
                </Paper>
              </div>
            </ThemeProvider>
        </>
    )
}