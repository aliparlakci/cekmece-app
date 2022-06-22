import * as React from "react"
import { Route, Switch } from "react-router-dom"

import CarListView from "./components/CarListView"
import CategoryListView from "./components/CategoryListView"
import DistributorListView from "./components/DistributorListView"
import OrdersListView from "./components/OrdersListView"
import ReviewListView from "./components/ReviewListView"
import DiscountsListView from "./components/DiscountsListView"
import InvoicesListView from "./components/InvoicesListView"
import useAuth from "../../hooks/useAuth"
import UserRoles from "../../models/userRoles"
import Links from "./components/Links"
import RefundsListView from "./components/RefundsListView"

export default function AdminPage() {
    const {user} = useAuth()
    return (
        <>
            <Switch>
                <Route path="/admin/cars">
                    {user && (user.role === "ADMIN" || user.role === "ProductManager") && <CarListView />}
                </Route>
                <Route path="/admin/categories">
                    {user && (user.role === "ADMIN" || user.role === "ProductManager") && <CategoryListView />}
                </Route>
                <Route path="/admin/distributors">
                    {user && (user.role === "ADMIN" || user.role === "ProductManager") && <DistributorListView />}
                </Route>
                <Route path="/admin/orders">
                    {user && (user.role === "ADMIN" || user.role === "ProductManager") && <OrdersListView />}
                </Route>
                <Route path="/admin/reviews">
                    {user && (user.role === "ADMIN" || user.role === "ProductManager") && <ReviewListView />}
                </Route>
                <Route path="/admin/discounts">
                    {user && (user.role === "ADMIN" || user.role === "SalesManager") && <DiscountsListView />}
                </Route>
                <Route path="/admin/invoices">
                    {user && (user.role === "ADMIN" || user.role === "SalesManager") && <InvoicesListView />}
                </Route>
                <Route path="/admin/refunds">
                    {user && (user.role === "ADMIN" || user.role === "SalesManager") && <RefundsListView />}
                </Route>
                <Route path="/admin">
                    {user && (user.role !== UserRoles.Customer) && <div className="p-6"><Links /></div>}
                </Route>
            </Switch>
        </>
    )
}
