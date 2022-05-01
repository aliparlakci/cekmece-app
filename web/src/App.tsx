import React from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import AdminPage from "./pages/admin/AdminPage"
import HomePage from "./pages/home/HomePage"
import CarDetailPage from "./pages/carDetail/CarDetailPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

import useAuth, { AuthProvider } from "./hooks/useAuth"
import { NotificationProvider } from "./hooks/useNotification"
import { ConfirmationProvider } from "./hooks/useConfirmation"

import UserRoles from "./models/userRoles"

import "./App.css"

function App() {
    const { user, loading } = useAuth()

    return (
        <>
            <AuthProvider>
                <NotificationProvider>
                    <ConfirmationProvider>
                        <Router>
                            <Switch>
                                <Route path="/admin">
                                    { !loading &&
                                        <>
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
