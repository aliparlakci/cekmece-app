import * as React from "react"
import { Route, Switch } from "react-router-dom"

import CarListView from "./components/CarListView"
import CategoryListView from "./components/CategoryListView"

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
            </Switch>
        </>
    )
}
