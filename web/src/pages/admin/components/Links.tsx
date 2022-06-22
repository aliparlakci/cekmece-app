import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"
import useAuth from "../../../hooks/useAuth"

export default function Links() {
    const { user } = useAuth()

    return <div>
        {user && (user.role === "ADMIN" || user.role === "ProductManager") &&
            <>
                <Link to="/admin/cars"><Button variant="text">Cars</Button></Link>
                <Link to="/admin/categories"><Button variant="text">Categories</Button></Link>
                <Link to="/admin/distributors"><Button variant="text">Distributors</Button></Link>
                <Link to="/admin/orders"><Button variant="text">Orders</Button></Link>
                <Link to="/admin/reviews"><Button variant="text">Reviews</Button></Link>
            </>
        }

        {user && (user.role === "ADMIN" || user.role === "SalesManager") &&
            <>
                <Link to="/admin/discounts"><Button variant="text">Discounts</Button></Link>
                <Link to="/admin/invoices"><Button variant="text">Invoices</Button></Link>
            </>
        }
    </div>
}