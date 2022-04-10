import React from "react"
import { Button, Box, Card, CardContent, CardMedia, CardActionArea, createTheme, Paper, Grid, ThemeProvider, Typography, Rating } from "@mui/material"
import { styled } from "@mui/material/styles"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        }
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
  });


export default function ProductCard() {
    return (
        <>
        <ThemeProvider theme={theme}>
            <Grid item xs={12} md={4}>
                    <Box margin={2}>
                        <Paper elevation={4} className="paper">
                            <CardActionArea>
                                <Box>
                                    <img src={"https://wallpaperaccess.com/full/8039043.jpg"} alt="" />
                                </Box>
                                <Box marginX={0.5} marginTop={1} sx={{ alignItems: "center", direction: "column", justifyContent: "center"}}>
                                    <Typography variant="h3" marginX={0.5} fontWeight="Bold" textAlign="left"> Porsche </Typography>
                                    <Typography variant="h4" marginX={0.5} fontWeight="Light" textAlign="left"> 911 GT3 Touring </Typography>
                                </Box>
                                <Box marginX={0.5} marginY={1} sx={{ alignItems: "center", direction: "column", justifyContent: "center"}}>
                                    <Typography variant="h6" marginX={0.5} fontWeight="light" textAlign="center"> 223.000$ </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }} marginBottom={1} marginTop={2} marginLeft={1}>
                                    <Rating name="size-small" size="small" defaultValue={4.5} precision={0.25} readOnly />
                                    <Typography variant="body2" marginLeft={0.5}> 4.5 </Typography>
                                    <Typography variant="body2" marginLeft={0.5}>(600 reviews)</Typography>
                                </Box>
                            </CardActionArea>
                            <Box>
                                <Button variant="text" endIcon={<AddShoppingCartIcon/>} sx={{  }} fullWidth={true}>Add to Cart</Button>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </ThemeProvider>
        </>
    )
}
