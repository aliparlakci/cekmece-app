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
import { FavoriteBorder, Home, ShoppingCart } from "@mui/icons-material"
import SearchIcon from "@mui/icons-material/Search"
import { styled, alpha } from "@mui/material/styles"

import useAuth from "../hooks/useAuth"
import useCart from "../hooks/useCart"

const theme = createTheme({
    palette: {
        primary: {
            main: "#1a1a1a",
        },
    },
})

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}))

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
    search?: string
    onSearch?: (value: string) => void
}

export default function NavBar({ search, onSearch }: INavBarProps) {
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
                        <Box sx={{ flexGrow: 1 }} />
                        <Link to="/wishlist">
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
                                        0
                                    )}
                                    color="error"
                                >
                                    <FavoriteBorder />
                                </Badge>
                            </IconButton>
                        </Link>
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
                                        0
                                    )}
                                    color="error"
                                >
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </Link>
                        {
                            // user && <Avatar sx={{ bgcolor: deepPurple[500], mr: 2 }}>{user.displayName}</Avatar>
                            user && (
                                <>
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? "basic-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? "true" : undefined}
                                        onClick={handleClick}
                                    >
                                        <Typography sx={{ color: "white" }}>{user.displayName}</Typography>
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
                        {search !== undefined && onSearch && (
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    value={search}
                                    onChange={(event) => onSearch(event.target.value)}
                                    inputProps={{ "aria-label": "search" }}
                                />
                            </Search>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    )
}
