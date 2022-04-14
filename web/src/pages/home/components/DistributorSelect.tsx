import * as React from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import ICategory from "../../../models/category"
import IDistributor from "../../../models/distributor"

interface IDistributorSelectProps {
    distributors: IDistributor[]
    value?: string
    onChange: (event) => any
}

export default function DistributorSelect({ distributors, value, onChange }: IDistributorSelectProps) {
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
                {distributors.map((distributor, i) => <MenuItem key={i} value={distributor.id}>{distributor.name}</MenuItem>)}
            </Select>
        </FormControl>
    )
}
