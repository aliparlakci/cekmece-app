import NavBar from "../../components/NavBar"
import Grid from "@mui/material/Grid"
import { Box, createTheme, Paper, responsiveFontSizes, ThemeProvider } from "@material-ui/core"
import Avatar from '@mui/material/Avatar';
import { Stack, Typography } from "@mui/material"
import React from "react"
import UserInfo from "./components/userInfo";

let theme = createTheme();

theme = responsiveFontSizes(theme);

function ProfilePage(){

    const user = {
        name:"Elon Musk",
        email:"elonmusk@mars.com",
        profilePhoto:"https://pbs.twimg.com/profile_images/1521957986335297536/itVSA7l0_400x400.jpg"
    }
    return(
        <>
        <NavBar></NavBar>
               <Grid container spacing={2} sx={{pt:10,px:5}}>
                   <Grid item md={12} xs={12} >
                       <Paper variant="outlined">
                          <UserInfo></UserInfo>
                       </Paper>
                   </Grid>

               </Grid>

        </>
    );
}

export default  ProfilePage;

/*
 <Box
                               sx={{
                                   height: 300,
                                   p:3,
                                   justifyContent:"center",
                                   alignItems:"center",
                                   alignContent:"center",
                                   display:"flex",
                                   flexDirection:"column"
                               }}
                           >
                                       <Avatar
                                           alt={user.name}
                                           src={user.profilePhoto}
                                           sx={{ width: {lg:140,md:90,xs:128 } , height:  {lg:140,md:90,xs:128 }}}
                                       />
                                       <Typography variant="h5" sx={{pt:3}} style={{ fontWeight: 600 }} align={"center"}>{user.name}</Typography>
                                       <Typography variant="body1">{user.email}</Typography>
                           </Box>
*/