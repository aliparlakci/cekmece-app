import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SortCars() {
  const [sortby, setSort] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  return (
    <FormControl sx={{ marginY:1, minWidth: 120 }} size="small">
      <InputLabel>Sort By</InputLabel>
      <Select
        value={sortby}
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
