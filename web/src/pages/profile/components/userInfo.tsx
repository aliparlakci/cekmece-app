import { Box, Button, ButtonGroup, Paper } from "@material-ui/core"
import Avatar from "@mui/material/Avatar"
import { Typography } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import AddressForm from "../../checkout/AddressForm"
import useAuth from "../../../hooks/useAuth"

const user = {
    name:"Elon Musk",
    email:"elonmusk@mars.com",
    profilePhoto:"https://pbs.twimg.com/profile_images/1521957986335297536/itVSA7l0_400x400.jpg"
}

export default function UserInfo() {
    const [open, setOpen] = React.useState(false);
    const { user, logout } = useAuth()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const buttons = [
        <Button key="one">Account Details</Button>,
        <Button key="two" onClick={handleClickOpen}>Change Address</Button>,
        <Button key="three"><Link to={`/orderHistory`}>My Orders</Link></Button>,
    ];
    return( <>
        <Paper variant="outlined">
            <Box
                sx={{
                    height: 350,
                    p:3,
                    justifyContent:"center",
                    alignItems:"center",
                    alignContent:"center",
                    display:"flex",
                    flexDirection:"column"
                }}
            >
                <Avatar
                    alt={user?.displayName ?? "A"}
                    src={""}
                    sx={{ width: {lg:140,md:90,xs:128 } , height:  {lg:140,md:90,xs:128 }}}
                />
                <Typography variant="h5" sx={{pt:3}} style={{ fontWeight: 600 }} align={"center"}>{user?.displayName}</Typography>
                <Typography variant="body1" sx={{pb:2}}>{user?.email}</Typography>

                <ButtonGroup size="large" aria-label="large text button group" variant={"text"} >
                    {buttons}
                </ButtonGroup>
            </Box>
        </Paper>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Change Delivery Address</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{pb:2}}>
                    You can change your delivery address from here
                </DialogContentText>
                <AddressForm onNext={(data) => {
                    console.log(data);
                    handleClose();
                }}/>
            </DialogContent>
        </Dialog>
    </>);
}