import React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import CommentIcon from "@mui/icons-material/Comment"
import { createTheme } from "@mui/material"
import { ThemeProvider } from "@emotion/react"

const theme = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
    },
})

export default function CheckboxList() {
    const [checked, setChecked] = React.useState([0])

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    return (
        <List
            sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper.dark",
                overflow: "scroll",
                maxHeight: 100,
                "& ul": { padding: 0 },
                marginTop: 1,
            }}
        >
            {[0, 1, 2, 3, 4, 5, 6].map((value) => {
                const labelId = `checkbox-list-label-${value}`

                return (
                    <ListItem key={value} disablePadding sx={{ padding: 0, margin: 0 }}>
                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ "aria-labelledby": labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List>
    )
}
