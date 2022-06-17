import * as React from "react"
import { useEffect, useState } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import { Link as RouterLink, useHistory } from "react-router-dom"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Grid from "@mui/material/Grid"

import useNotification, { NOTIFICATON_TYPES } from "../hooks/useNotification"
import useAuth from "../hooks/useAuth"

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})

export default function LoginPage() {
    const [loading, setLoading] = useState(false)

    const history = useHistory()
    const notification = useNotification()
    const auth = useAuth()

    useEffect(() => {
        if (auth.user) history.push("/")
    }, [auth.user])

    const handleLogin = async (email: string, password: string) => {
        const body = {
            "email": email,
            "password": password,
        }

        const response = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.status === 200) {
            setLoading(false)
            auth.refresh()
        } else if (response.status === 400) {
            throw `Invalid login attempt!`
        } else {
            throw `Something went wrong`
        }

    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const email = data.get("email")
        const password = data.get("password")

        handleLogin(email as string, password as string).catch((e) => {
            notification(NOTIFICATON_TYPES.ERROR, e)
        }).finally(() => setLoading(false))
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            disabled={loading}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            disabled={loading}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    <RouterLink to="/register">
                                        Do not have account? Sign Up
                                    </RouterLink>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}