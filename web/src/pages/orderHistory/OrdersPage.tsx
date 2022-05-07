import React from "react"
import NavBar from "../../components/NavBar"
import { Box, Button, createTheme, ThemeProvider, Typography, Paper } from "@mui/material"
import OrderSection from "./components/OrderSection"

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})


export default function OrdersPage() {
    return (
        <>
            <ThemeProvider theme={theme}>
               <NavBar/>
               <div className="flex flex-row justify-center mt-20">
                <div className="max-w-screen-lg flex-nowrap" >
                <Typography variant="h3" sx={{ fontWeight:"light" }}>Order History</Typography>
                <Paper elevation={0} sx={{ borderRadius:0 }} className="max-w-screen-lg mt-10 mb-2 px-16">
                  <Box className="grid grid-cols-5 gap-6">
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight:"light" }}>Order ID:</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight:"light" }}>Date:</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight:"light" }}>Price:</Typography>
                    </Box>
                    <Box>
                     <Typography variant="h6" sx={{ fontWeight:"light" }}>Status:</Typography>
                    </Box>  
                  </Box>
                </Paper>
                  <OrderSection/>
                  <OrderSection/>
                  <OrderSection/>
                  <OrderSection/>
                  <OrderSection/>
                  <OrderSection/>
                  <OrderSection/>
                  <OrderSection/>
                </div>
               </div>               
            </ThemeProvider>
        </>
    )
}
