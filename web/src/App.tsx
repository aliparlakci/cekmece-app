import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import AdminPage from "./pages/admin/AdminPage"
import HomePage from "./pages/home/HomePage"

import "./App.css"
import CarDetailPage from "./pages/carDetail/CarDetailPage"
import { NotificationProvider } from "./hooks/useNotification"

function App() {
    return (
        <>
            <NotificationProvider>
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
            </NotificationProvider>
        </>
    )
}

export default App
