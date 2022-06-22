import React, { useEffect } from "react"
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from "react-router-dom"

import AdminPage from "./pages/admin/AdminPage"
import HomePage from "./pages/home/HomePage"
import CarDetailPage from "./pages/carDetail/CarDetailPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import CartPage from "./pages/cart/CartPage"
import OrdersPage from "./pages/orderHistory/OrdersPage"
import CheckoutPage from "./pages/checkout"

import useAuth from "./hooks/useAuth"
import { CartProvider } from "./hooks/useCart"
import { NotificationProvider } from "./hooks/useNotification"
import { ConfirmationProvider } from "./hooks/useConfirmation"
import { WishlistProvider } from "./hooks/useWishlist"

import UserRoles from "./models/userRoles"

import "./App.css"
import WishlistPage from "./pages/wishlist/WishlistPage"
import ProfilePage from "./pages/profile/ProfilePage"
import NavBar from "./components/NavBar"
import { Typography } from "@mui/material"


function App() {
    const { user, loading } = useAuth()

    return (
        <>
            <NotificationProvider>
                <ConfirmationProvider>
                    <CartProvider>
                        <WishlistProvider>
                        <Router>
                            <NavBar></NavBar>
                            <div className="mt-16">
                                <Switch>
                                    <Route path="/admin">
                                        {!loading && (
                                            <>
                                                {user === null && <Redirect to="/login" />}
                                                {user?.role !== UserRoles.Customer && <AdminPage />}
                                                {user?.role === UserRoles.Customer && <Redirect to="/" />}
                                            </>
                                        )}
                                    </Route>
                                    <Route exact path="/">
                                        <HomePage />
                                    </Route>
                                    <Route path="/login">
                                        <LoginPage />
                                    </Route>
                                    <Route path="/register">
                                        <RegisterPage />
                                    </Route>
                                    <Route path="/cart">
                                        <CartPage />
                                    </Route>
                                    <Route path="/checkout">
                                        {user && <CheckoutPage />}
                                        {user === null && <Redirect to="/login" />}
                                    </Route>
                                    <Route path="/cars/:carId">
                                        <CarDetailPage />
                                    </Route>
                                    <Route path="/orderHistory">
                                        <OrdersPage />
                                    </Route>
                                    <Route path="/profile">
                                        <ProfilePage />
                                    </Route>
                                    <Route path="/wishlist">
                                        {user === null && <Redirect to="/login" />}
                                        {user && <WishlistPage />}
                                    </Route>
                                </Switch>
                            </div>
                        </Router>
                        </WishlistProvider>
                    </CartProvider>
                </ConfirmationProvider>
            </NotificationProvider>
        </>
    )
}

export default App
