import React from "react"
import {
    Button,
    Box,
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Container,
    createTheme,
    Paper,
    Grid,
    ThemeProvider,
    Typography,
    Rating,
    Slider,
    Divider,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import BrandsList from "./BrandsList"
import PriceSlider from "./PriceSlider"

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
    components: {
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: "body2",
                    },
                    style: {
                        fontSize: 11,
                    },
                },
            ],
        },
    },
})


export default function FilterMenu() {

    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid item sx={{ width: { md: 200, lg: 300, xl: 400 }, display: { xs: "none", md: "inline" } }}>
                    <Container>
                        <Box marginTop={2}>
                            <Paper elevation={4} className="paper">
                                <Box sx={{ paddingX: 5, paddingY: 2 }}>
                                  <Typography>Select Brands:</Typography>
                                  <BrandsList/>
                                </Box>
                                <Divider variant="middle"/>
                                <Box sx={{ paddingX: 5, paddingY: 2 }}>
                                    <Typography>Price Range:</Typography>
                                    <PriceSlider/>
                                </Box>
                                <Box>
                                    <Button variant="contained" fullWidth={true} sx={{ borderRadius:0 }}>
                                        Show Cars
                                    </Button>
                                </Box>
                            </Paper>
                        </Box>
                    </Container>
                </Grid>
            </ThemeProvider>
        </>
    )
}
