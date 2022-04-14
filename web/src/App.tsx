import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import AdminPage from "./pages/admin/AdminPage"
import HomePage from "./pages/home/HomePage"
import CarDetailPage from "./pages/carDetail/CarDetailPage"

import { NotificationProvider } from "./hooks/useNotification"
import { ConfirmationProvider } from "./hooks/useConfirmation"

import "./App.css"

function App() {
    return (
        <>
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
                            <Route path="/cars/:carId">
                                <CarDetailPage />
                            </Route>
                        </Switch>
                    </Router>
                </ConfirmationProvider>
            </NotificationProvider>
        </>
    )
}

export default App
