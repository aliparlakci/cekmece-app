import * as React from "react"
import {
    Avatar,
    AppBar,
    Box,
    createTheme,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    ThemeProvider,
    Pagination, Button,
} from "@mui/material"
import { Home, ShoppingCart } from "@mui/icons-material"
import SearchIcon from "@mui/icons-material/Search"
import { styled, alpha } from "@mui/material/styles"
import { deepPurple } from "@mui/material/colors"
import useAuth from "../../../hooks/useAuth"
import { Link, useHistory } from "react-router-dom"

const theme = createTheme({
    palette: {
        primary: {
            main: "#1a1a1a",
        },
    },
})

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}))

interface INavBarProps {
    search: string
    onSearch: (value: string) => void
}

export default function NavBar() {
    const { user, logout } = useAuth()
    const history = useHistory()

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                            <Home />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
                            Zort Storzt
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                            <Badge badgeContent={1} color="error">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        {
                            // user && <Avatar sx={{ bgcolor: deepPurple[500], mr: 2 }}>{user.displayName}</Avatar>
                            user && <>
                                {user.displayName}
                                <hr />
                                <Button variant="text" color="inherit" onClick={() => logout()}>Logout</Button>
                            </>
                        }
                        {
                            user === null && <div className="flex gap-2">
                                <Link to="/register">Register</Link>
                                <Link to="/login">Login</Link>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
}