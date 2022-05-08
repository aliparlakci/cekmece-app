import * as React from "react"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

export interface IPaymentData {
    cardName: string
    cardNumber: string
    expDate: string,
    cvv: string
}

interface IPaymentFormProps {
    onNext: (data: IPaymentData) => void
}

export default function PaymentForm({ onNext }: IPaymentFormProps) {
    const [formData, updateFormData] = useState<IPaymentData>({
        cardNumber: "XXXX XXXX XXXX XXXX",
        cardName: "",
        expDate: "MM/YY",
        cvv: "XXX"
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onNext(formData)
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <form onSubmit={(event) => handleSubmit(event)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cardName"
                            name="cardName"
                            label="Name on card"
                            fullWidth
                            autoComplete="cc-name"
                            variant="standard"
                            placeholder=""
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cardNumber"
                            name="cardNumber"
                            label="Card number"
                            type="numeric"
                            inputProps={{
                                "pattern": "([0-9]{4})( |)([0-9]{4})( |)([0-9]{4})( |)([0-9]{4})"
                            }}
                            fullWidth
                            autoComplete="cc-number"
                            variant="standard"
                            placeholder="XXXX XXXX XXXX XXXX"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="expDate"
                            name="expDate"
                            label="Expiry date"
                            inputProps={{
                                "pattern": "([0-9][0-9]|[0-9])/([0-9][0-9]|[0-9])"
                            }}
                            fullWidth
                            autoComplete="cc-exp"
                            variant="standard"
                            placeholder="MM/YY"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cvv"
                            name="ccv"
                            label="CVV"
                            helperText="Last three digits on signature strip"
                            fullWidth
                            inputProps={{
                                "pattern": "[0-9]{3}"
                            }}
                            autoComplete="cc-csc"
                            variant="standard"
                            placeholder="XXX"
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained" sx={{ mt: 3, ml: 1 }} type="submit">
                        Next
                    </Button>
                </Box>
            </form>

        </React.Fragment>
    )
}
