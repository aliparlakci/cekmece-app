import React from "react"
import { Link, useHistory } from "react-router-dom"
import {
    AppBar,
    Box,
    createTheme,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    ThemeProvider,
    Button,
    Menu,
    MenuItem,
} from "@mui/material"
import { Home, ShoppingCart } from "@mui/icons-material"
import SearchIcon from "@mui/icons-material/Search"
import { styled, alpha } from "@mui/material/styles"

import useAuth from "../hooks/useAuth"
import useCart from "../hooks/useCart"

const theme = createTheme({
    palette: {
        primary: {
            main: "#ffffff",
            contrastText: "#000000"
        },
    },
})

interface INavBarProps {
    children?: any
}

export default function NavBar({ children }: INavBarProps) {
    const history = useHistory()
    const { user, logout } = useAuth()
    const { cart } = useCart()

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            onClick={() => history.push("/")}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <Home />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
                            CarWow
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: "flex", gap: "1rem", paddingLeft: "3rem", alignItems: "center" }}>
                                {children}
                            </Box>
                        </Box>
                        <Link to="/cart">
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                            >
                                <Badge
                                    badgeContent={Object.keys(cart).reduce(
                                        (prev, id) => cart[id] && cart[id].amount + prev,
                                        0,
                                    )}
                                    color="error"
                                >
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </Link>
                        {
                            user && (
                                <>
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? "basic-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? "true" : undefined}
                                        onClick={handleClick}
                                    >
                                        <Typography sx={{ color: "#000000" }}>{user.displayName}</Typography>
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            "aria-labelledby": "basic-button",
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Link to={`/orderHistory`}>My Orders</Link>
                                        </MenuItem>
                                    </Menu>

                                    <hr />
                                    <Button variant="text" color="inherit" onClick={() => logout()}>
                                        Logout
                                    </Button>
                                </>
                            )
                        }
                        {user === null && (
                            <div className="flex gap-2">
                                <Link to="/register">Register</Link>
                                <Link to="/login">Login</Link>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
}
