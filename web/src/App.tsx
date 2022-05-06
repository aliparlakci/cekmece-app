import React, { useEffect } from "react"
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"

import AdminPage from "./pages/admin/AdminPage"
import HomePage from "./pages/home/HomePage"
import CarDetailPage from "./pages/carDetail/CarDetailPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import CartPage from "./pages/cart/CartPage"

import useAuth from "./hooks/useAuth"
import { CartProvider } from "./hooks/useCart"
import { NotificationProvider } from "./hooks/useNotification"
import { ConfirmationProvider } from "./hooks/useConfirmation"

import UserRoles from "./models/userRoles"

import "./App.css"

function App() {
    const { user, loading } = useAuth()

    return (
        <>
            <NotificationProvider>
                <ConfirmationProvider>
                    <CartProvider>
                        <Router>
                            <Switch>
                                <Route path="/admin">
                                    {!loading &&
                                        <>
                                            {user === null && <Redirect to="/login" />}
                                            {user?.role === UserRoles.ADMIN && <AdminPage />}
                                            {user?.role !== UserRoles.ADMIN && <Redirect to="/" />}
                                        </>
                                    }
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
                                <Route path="/cars/:carId">
                                    <CarDetailPage />
                                </Route>
                            </Switch>
                        </Router>
                    </CartProvider>
                </ConfirmationProvider>
            </NotificationProvider>
        </>
    )
}

export default App
