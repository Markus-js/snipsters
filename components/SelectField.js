import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material'

export default function SelectField(props) {
  const { value, dataList, handleChange, label } = props;

  return (
    <FormControl fullWidth>
      <Select
        labelId="select"
        value={value}
        label={label}
        onChange={handleChange}
      >
        {dataList.map(item => (
          <MenuItem key={`${item}+key`} className="menu-item" value={item.toLowerCase()}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
