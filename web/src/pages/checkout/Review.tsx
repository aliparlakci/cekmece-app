import * as React from "react"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Grid from "@mui/material/Grid"
import { IAddressData } from "./AddressForm"
import { IPaymentData } from "./PaymentForm"
import { ICartItem } from "../../hooks/useCart"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import LoadingButton from "@mui/lab/LoadingButton"

interface IReviewProps {
    address: IAddressData
    payment: IPaymentData
    items: ICartItem[]
    onConfirm: () => void
    loading: boolean
}

export default function Review({ address, payment, items, onConfirm, loading }: IReviewProps) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {items.map(({ item, amount }) => (
                    <>
                        {[...Array(amount).keys()].map((i) => (
                            <ListItem key={item.id || 0} sx={{ py: 1, px: 0 }}>
                                <ListItemText primary={item.name} secondary={item.distributor?.name || ""} />
                                <Typography variant="body2">${item.price}</Typography>
                            </ListItem>
                        ))}
                    </>
                ))}
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        ${items.reduce((prev, { item, amount }) => prev + amount * item.price, 0)}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>
                        {address.firstName} {address.lastName}
                    </Typography>
                    <Typography gutterBottom>
                        {[address.address1, address.address2, address.zip, address.city, address.country].join(", ")}
                    </Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>
                    <Grid container direction="column">
                        <Grid item xs={6}>
                            <Typography gutterBottom>{payment.cardName}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom>{payment.cardNumber.slice(0, 4)} **** **** ****</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <LoadingButton loading={loading} variant="contained" sx={{ mt: 3, ml: 1 }} onClick={() => onConfirm()}>
                    Purchase
                </LoadingButton>
            </Box>
        </React.Fragment>
    )
}
