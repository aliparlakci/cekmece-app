import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export type SortType = "priceHigh" | "priceLow" | "mostPopular" | "leastPopular"

interface ISortCarsProps {
    sort: SortType,
    onChange: (sort: SortType) => void
}

export default function SortCars({ sort, onChange }: ISortCarsProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as SortType);
  };

  return (
    <FormControl sx={{ marginY:1, minWidth: 120 }} size="small">
      <InputLabel>Sort By</InputLabel>
      <Select
        value={sort}
        label="Sort By"
        onChange={handleChange}
      >
        <MenuItem value={"priceHigh"}>Highest Price</MenuItem>
        <MenuItem value={"priceLow"}>Lowest Price</MenuItem>
        <MenuItem value={"mostPopular"}>Most Popular</MenuItem>
        <MenuItem value={"leastPopular"}>Least Popular</MenuItem>
      </Select>
    </FormControl>
  );
}
