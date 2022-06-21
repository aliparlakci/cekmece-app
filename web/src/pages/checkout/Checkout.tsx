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
import { Link, Redirect, Route, useHistory, useLocation } from "react-router-dom"
import useCart from "../../hooks/useCart"
import Button from "@mui/material/Button"
import useNotification, { NOTIFICATON_TYPES } from "../../hooks/useNotification"

const steps = ["Address", "Payment details", "Review your order"]

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})

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
    cvv: "XXX",
}

export default function Checkout() {
    const [activeStep, setActiveStep] = useState(1)
    const [addressData, setAddressData] = useState<IAddressData>(defaultAddress)
    const [paymentData, setPaymentData] = useState<IPaymentData>(defaultPayment)
    const [pdfLocation, setPdfLocation] = useState("")

    const [loading, setLoading] = useState(false)

    const notification = useNotification()

    const location = useLocation()
    const history = useHistory()
    const { cart, pushCart, reset: resetCart } = useCart()

    useEffect(() => {
        if (location.pathname.includes("address")) setActiveStep(1)
        if (location.pathname.includes("payment")) setActiveStep(2)
        if (location.pathname.includes("review")) setActiveStep(3)
        if (location.pathname.includes("complete")) setActiveStep(4)
    }, [location])

    const handleOrderSubmit = async () => {
        setLoading(true)
        try {
            await pushCart()
            const response = await fetch("/api/orders/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        "addressLine1": addressData.address1,
                        "addressLine2": addressData.address2,
                        "city": addressData.city,
                        "zipCode": addressData.zip,
                        "country": addressData.country,
                    },
                ),
            })
            if (response.status !== 200) throw `Response status is ${response.status}`
            const data = await response.json()
            setPdfLocation(data.pdf)

            resetCart()
            history.push("/checkout/completed")
        } catch (e) {
            notification(NOTIFICATON_TYPES.ERROR, "Something happened")
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

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
                        <AddressForm onNext={(data) => {
                            setAddressData(data)
                            history.push("/checkout/payment")
                        }} />
                    </Route>
                    <Route path="/checkout/payment">
                        <PaymentForm onNext={(data) => {
                            setPaymentData(data)
                            history.push("/checkout/review")
                        }} />
                    </Route>
                    <Route path="/checkout/review">
                        <Review address={addressData} payment={paymentData}
                                items={Object.keys(cart).map(id => cart[id])}
                                onConfirm={handleOrderSubmit}
                                loading={loading}
                        />
                    </Route>
                    <Route path="/checkout/completed">
                        <Typography variant="h5" gutterBottom>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order is received. We have emailed your receipt, and will
                            send you an update when your order has shipped.
                        </Typography>
                        <Button variant="contained" sx={{ mt: 3, ml: 1 }} onClick={() => window.location.href = `http://localhost:5001/api/orders/invoice/${pdfLocation}`}>
                            View invoice
                        </Button>
                        <Button variant="outlined" sx={{ mt: 3, ml: 1 }} onClick={() => history.push("/")}>
                            Return to home page
                        </Button>
                    </Route>
                    <Route exact path="/checkout">
                        <Redirect to="/checkout/address" />
                    </Route>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}
