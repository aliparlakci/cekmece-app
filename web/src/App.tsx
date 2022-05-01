import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import AdminPage from "./pages/admin/AdminPage"
import HomePage from "./pages/home/HomePage"
import CarDetailPage from "./pages/carDetail/CarDetailPage"
import LoginPage from "./pages/LoginPage"

import { AuthProvider } from "./hooks/useAuth"
import { NotificationProvider } from "./hooks/useNotification"
import { ConfirmationProvider } from "./hooks/useConfirmation"

import "./App.css"
import RegisterPage from "./pages/RegisterPage"

function App() {
    return (
        <>
            <AuthProvider>
                <NotificationProvider>
                    <ConfirmationProvider>
                        <Router>
                            <Switch>
                                <Route path="/admin">
                                    <AdminPage />
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
                                <Route path="/cars/:carId">
                                    <CarDetailPage />
                                </Route>
                            </Switch>
                        </Router>
                    </ConfirmationProvider>
                </NotificationProvider>
            </AuthProvider>
        </>
    )
}

export default App
