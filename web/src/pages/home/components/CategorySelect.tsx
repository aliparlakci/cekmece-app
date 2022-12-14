import * as React from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import ICategory from "../../../models/category"

interface ICategorySelectProps {
    categories: ICategory[]
    value?: string
    onChange: (event) => any
}

export default function CategorySelect({ categories, value, onChange }: ICategorySelectProps) {
    return (
        <FormControl sx={{ marginY: 1, minWidth: 120 }} size="small">
            <InputLabel>Choose</InputLabel>
            <Select
                value={value}
                label="Choose"
                onChange={(event) => onChange(event.target.value)}
            >
                <MenuItem value="">
                    <em>Show All</em>
                </MenuItem>
                {categories && categories.map((category, i) => <MenuItem key={i} value={category.id}>{category.name}</MenuItem>)}
            </Select>
        </FormControl>
    )
}
