import React from "react"
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"

export default function ProductCard() {
    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </>
    )
}
