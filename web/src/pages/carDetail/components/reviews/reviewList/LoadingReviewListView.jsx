import { Fragment } from "react"
import { Box, Skeleton, Divider } from "@mui/material"

function LoadingHeader() {
    return (
        <Fragment>
            <Box
                sx={{
                    paddingLeft: 4,
                    paddingRight: 4,
                    paddingTop: 1,
                    paddingBottom: 2,
                }}
            >
                <Box display="flex" justifyContent="center">
                    <Skeleton width="75%" height={125} />
                </Box>
                <Skeleton width="100%" />
                <Skeleton width="100%" />
                <Skeleton width="100%" />
                <Skeleton width="100%" />
                <Skeleton width="100%" />
            </Box>
            <Divider />
        </Fragment>
    )
}

function LoadingReviewItem() {
    return (
        <Fragment>
            <Box
                sx={{
                    paddingTop: 2,
                    paddingBottom: 2,
                    paddingLeft: 4,
                    paddingRight: 4,
                }}
            >
                <Skeleton
                    sx={{
                        width: {
                            xs: "90%",
                            sm: "67.5%",
                            md: "45%",
                        },
                    }}
                />
                <Skeleton width="100%" />
                <Skeleton width="100%" />
            </Box>
            <Divider />
        </Fragment>
    )
}

function LoadingView() {
    return (
        <Fragment>
            <LoadingHeader />
            <LoadingReviewItem />
            <LoadingReviewItem />
            <LoadingReviewItem />
            <LoadingReviewItem />
            <LoadingReviewItem />
        </Fragment>
    )
}

export default LoadingView
