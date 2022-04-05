import { useParams } from "react-router-dom"
import { useState, Fragment } from "react"

import { Rating, Box, Drawer, Button } from "@mui/material"
import { StarOutlineSharp, StarSharp } from "@mui/icons-material"
import theme from "./theme"
import { ThemeProvider } from "@emotion/react"
import date from "date-and-time"
import ReadMore from "./components/ReadMore"
import ReviewList from "./components/ReviewList"

function CarDetailPage() {
    const params = useParams()
    const { carId } = params
    const averageRating = 4.5
    const reviewCount = 555

    const [drawerIsOpen, setDrawerIsOpen] = useState(false)

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return
        }

        setDrawerIsOpen(open)
    }

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Fragment>
                    <Box display="flex" justifyContent="center" textAlign="center" alignItems="center">
                        <Button onClick={toggleDrawer(true)} sx={{ minWidth: 250, fontWeight: 700, color: "black" }}>
                            REVIEWS ({reviewCount})
                            <Rating
                                name="read-only"
                                precision={0.5}
                                value={averageRating}
                                emptyIcon={<StarOutlineSharp sx={{ color: "black", fontSize: 18 }} />}
                                icon={<StarSharp sx={{ color: "black", fontSize: 18 }} />}
                                sx={{ paddingLeft: 2 }}
                                readOnly
                            />
                        </Button>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Button
                            variant="contained"
                            onClick={toggleDrawer(true)}
                            disableElevation
                            sx={{
                                minWidth: 250,
                                fontWeight: 700,
                                color: "white",
                                backgroundColor: "black",
                                ":hover": {
                                    backgroundColor: "#2D2D2D",
                                },
                            }}
                        >
                            LEAVE A REVIEW
                        </Button>
                    </Box>
                    <Drawer anchor="right" open={drawerIsOpen} onClose={toggleDrawer(false)}>
                        <Box sx={{ width: 500 }} role="presentation" onKeyDown={toggleDrawer(false)}>
                            <ReviewList carId={carId}></ReviewList>
                        </Box>
                    </Drawer>
                </Fragment>
            </div>
        </ThemeProvider>
    )
}

export default CarDetailPage
