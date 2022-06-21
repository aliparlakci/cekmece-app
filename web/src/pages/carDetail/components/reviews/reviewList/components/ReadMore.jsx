import { useState, Fragment } from "react"
import { Typography } from "@mui/material"
import { ApprovalStatus } from "../../../../../../models/review"

const ReadMore = ({ approvalStatus, children }) => {
    const text = children
    const [isReadMore, setIsReadMore] = useState(true)
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore)
    }

    if (approvalStatus === ApprovalStatus.IN_PROGRESS) {
        return (
            <Typography
                variant="body2"
                sx={{ display: "inline", fontWeight: 500, fontStyle: "italic" }}
                component="span"
            >
                {text}
            </Typography>
        )
    }

    if (text.length < 150) {
        return (
            <Typography variant="body2" sx={{ display: "inline", fontWeight: 500 }} component="span">
                {text}
            </Typography>
        )
    }

    return (
        <Fragment>
            <Typography variant="body2" sx={{ display: "inline", fontWeight: 500 }} component="span">
                {isReadMore ? text.slice(0, 150) : text}
            </Typography>
            <Typography
                sx={{ display: "inline", fontWeight: 700 }}
                component="span"
                variant="body2"
                onClick={toggleReadMore}
            >
                {isReadMore ? "...read more" : " show less"}
            </Typography>
        </Fragment>
    )
}

export default ReadMore
