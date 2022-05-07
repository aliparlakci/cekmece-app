import React, { useEffect, useState } from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import AddressForm, { IAddressData } from "./AddressForm"
import PaymentForm, { IPaymentData } from "./PaymentForm"
import Review from "./Review"
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom"
import useCart from "../../hooks/useCart"

const steps = ["Address", "Payment details", "Review your order"]

const theme = createTheme()

const defaultAddress = {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    country: "",
}

const defaultPayment = {
    cardNumber: "XXXX XXXX XXXX XXXX",
    cardName: "",
    expDate: "MM/YY",
    cvv: "XXX"
}

export default function Checkout() {
    const [activeStep, setActiveStep] = useState(1)
    const [addressData, setAddressData] = useState<IAddressData>(defaultAddress)
    const [paymentData, setPaymentData] = useState<IPaymentData>(defaultPayment)

    const location = useLocation()
    const history = useHistory()
    const { cart } = useCart()

    useEffect(() => {
        if (location.pathname.includes("address")) setActiveStep(1)
        if (location.pathname.includes("payment")) setActiveStep(2)
        if (location.pathname.includes("review")) setActiveStep(3)
        if (location.pathname.includes("complete")) setActiveStep(4)
    }, [location])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep - 1} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Route path="/checkout/address">
                        <AddressForm onNext={() => history.push("/checkout/payment")} />
                    </Route>
                    <Route path="/checkout/payment">
                        <PaymentForm onNext={() => history.push("/checkout/review")} />
                    </Route>
                    <Route path="/checkout/review">
                        <Review />
                    </Route>
                    <Route path="/checkout/completed">
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order number is #2001539. We have emailed your order confirmation, and will
                            send you an update when your order has shipped.
                        </Typography>
                    </Route>
                    <Route exact path="/checkout">
                        <Redirect to="/checkout/address" />
                    </Route>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}
