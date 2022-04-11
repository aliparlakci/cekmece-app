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
                    <Box marginX={2} marginBottom={4}>
                        <Paper elevation={8} className="paper" sx={{ borderRadius:0 }}>
                            <CardActionArea >
                                <Box>
                                    <img src={"https://wallpaperaccess.com/full/8039043.jpg"} alt="" />
                                </Box>
                                <Box marginX={0.5} marginTop={0.5} sx={{ alignItems: "center", direction: "column", justifyContent: "center"}}>
                                    <Typography variant="h3" marginX={0.5} fontWeight="Bold" textAlign="left"> Porsche </Typography>
                                    <Typography variant="h4" marginX={0.5} fontWeight="Light" textAlign="left"> 911 GT3 Touring </Typography>
                                </Box>
                                <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between"}} marginTop={4} marginBottom={1} marginX={1}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Rating name="size-small" size="small" defaultValue={4.5} precision={0.25} readOnly />
                                        <Typography variant="body2" marginLeft={0.5}> 4.5 </Typography>
                                        <Typography variant="body2" marginLeft={0.5}>(600 reviews)</Typography>
                                    </Box>
                                    <Box paddingBottom={0.5}>
                                        <Typography variant="h5" fontWeight="bold" textAlign="right"> 223.000$ </Typography>
                                    </Box>
                                </Box>
                                
                            </CardActionArea>
                            <Box>
                                <Button variant="text" endIcon={<AddShoppingCartIcon/>} sx={{ borderRadius:0 }} fullWidth={true} >Add to Cart</Button>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </ThemeProvider>
        </>
    )
}
