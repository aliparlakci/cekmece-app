import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function CategorySelect() {
  const [category, setCategory] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <FormControl sx={{ marginY:1, minWidth: 120 }} size="small">
      <InputLabel>Choose</InputLabel>
      <Select
        value={category}
        label="Choose"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Show All</em>
        </MenuItem>
        <MenuItem value={"sedan"}>Sedan</MenuItem>
        <MenuItem value={"hatchback"}>Hatchback</MenuItem>
        <MenuItem value={"suv"}>SUV</MenuItem>
      </Select>
    </FormControl>
  );
}
