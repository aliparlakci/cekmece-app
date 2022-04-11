import { Box, Typography, LinearProgress } from "@mui/material"
import { styled } from "@mui/material/styles"
import { linearProgressClasses } from "@mui/material/LinearProgress"
import { Rating } from "@mui/material"
import { StarOutlineSharp, StarSharp } from "@mui/icons-material"

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",

    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: "white",
    },
    [`& .${linearProgressClasses.bar}`]: {
        background: "linear-gradient(62deg, #6faeed 0%, #c899f5 100%)",
    },
}))

function LinearProgressWithLabel(props) {
    return (
        <Box display="flex" alignItems="center" sx={{}}>
            <Rating
                name="read-only"
                value={props.star}
                emptyIcon={<StarOutlineSharp sx={{ color: "black", fontSize: 18 }} />}
                icon={<StarSharp sx={{ color: "black", fontSize: 18 }} />}
                readOnly
            />
            <Box sx={{ width: "100%", mr: 2, ml: 2 }}>
                <BorderLinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 25 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {" "}
                    {`${Math.round(props.value)}%`}{" "}
                </Typography>
            </Box>
        </Box>
    )
}

export default LinearProgressWithLabel
