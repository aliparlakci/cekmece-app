import { Box, Container, createTheme, CssBaseline, Grid, Paper} from "@mui/material"
import { styled } from '@mui/material/styles';
import React from "react"
import ProductCard from "./components/ProductCard"
import ProductsView from "./components/ProductCard"
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
                <Grid container direction="row" justifyContent="flex-start">
                    <Grid item xs={3}>
                        <Container>
                        <Grid container direction="column" justifyContent="flex-start" alignItems="center" marginTop={1}>
                            <FilterMenu/>
                        </Grid>
                        </Container>
                    </Grid>
                    <Grid item xs={9}>
                    <Container>    
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center" marginTop={1}>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                            <ProductCard/>
                        </Grid>
                    </Container>
                    </Grid>     
                </Grid>
                
            </ThemeProvider>
        </>
    )
}
