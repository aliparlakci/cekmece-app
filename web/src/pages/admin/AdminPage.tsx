import * as React from "react"
import { Route, Switch } from "react-router-dom"

import CarListView from "./components/CarListView"
import CategoryListView from "./components/CategoryListView"
import DistributorListView from "./components/DistributorListView"
import OrdersListView from "./components/OrdersListView"

export default function AdminPage() {
    return (
        <>
            <Switch>
                <Route path="/admin/cars">
                    <CarListView />
                </Route>
                <Route path="/admin/categories">
                    <CategoryListView />
                </Route>
                <Route path="/admin/distributors">
                    <DistributorListView />
                </Route>
                <Route path="/admin/orders">
                    <OrdersListView />
                </Route>
                <Route path="/admin/reviews">
                    Reviews
                </Route>
            </Switch>
        </>
    )
}
