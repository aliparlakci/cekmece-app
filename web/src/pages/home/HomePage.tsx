import { Box, Container, createTheme, Grid} from "@mui/material"
import React from "react"
import ProductsView from "./components/ProductsView"
import FilterMenu from "./components/FilterMenu";
import NavBar from './components/NavBar'
import { ThemeProvider } from "@mui/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        }
    },
});


export default function HomePage() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <NavBar/>
                <Grid container direction="row" justifyContent="center" marginTop={10}>
                    <Grid item xs={3} sx={{ display: { xs: "none", lg: "inline" }, zIndex:10}}>
                        <Container sx={{top:100, justifyContent:"center"}}>
                        <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                            <FilterMenu/>
                        </Grid>
                        </Container>
                    </Grid>
                    <Grid item xs={12} lg={9}>
                    <Container>    
                        <ProductsView/>
                    </Container>
                    </Grid>     
                </Grid>
                
            </ThemeProvider>
        </>
    )
}
