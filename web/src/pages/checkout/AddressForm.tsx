import * as React from "react"
import { useState } from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { createTheme, ThemeProvider } from "@mui/material/styles"

export interface IAddressData {
    firstName: string
    lastName: string
    address1: string
    address2: string
    city: string
    zip: string
    country: string
}

interface IAddressFormProps {
    onNext: (data: IAddressData) => void
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})

export default function AddressForm({ onNext }: IAddressFormProps) {
    const [formData, updateFormData] = useState<IAddressData>({
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        zip: "",
        country: "",
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
        <>
        <ThemeProvider theme={theme}>
            <Typography variant="h6" gutterBottom>
                Address
            </Typography>
            <form onSubmit={(event) => handleSubmit(event)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First name"
                            fullWidth
                            autoComplete="given-name"
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last name"
                            fullWidth
                            autoComplete="family-name"
                            variant="standard"
                            onChange={handleChange}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address1"
                            name="address1"
                            label="Address line 1"
                            fullWidth
                            autoComplete="shipping address-line1"
                            variant="standard"
                            onChange={handleChange}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="address2"
                            name="address2"
                            label="Address line 2"
                            fullWidth
                            autoComplete="shipping address-line2"
                            variant="standard"
                            onChange={handleChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            autoComplete="shipping address-level2"
                            variant="standard"
                            onChange={handleChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="state" name="state" label="State/Province/Region" fullWidth variant="standard" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="zip"
                            name="zip"
                            label="Zip / Postal code"
                            fullWidth
                            autoComplete="shipping postal-code"
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="country"
                            name="country"
                            label="Country"
                            fullWidth
                            autoComplete="shipping country"
                            variant="standard"
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
            </ThemeProvider>
        </>
    )
}
