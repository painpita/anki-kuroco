import React from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
    IconFlagUK,
    IconFlagFR
  } from 'material-ui-flags';
  
const LanguageSelector = () => {

    return (
        <FormControl variant="standard">
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Language"
          defaultValue={"en"}
        >
          <MenuItem value={"en"}><IconFlagUK></IconFlagUK></MenuItem>
          <MenuItem value={"fr"}><IconFlagFR></IconFlagFR></MenuItem>
        </Select>
      </FormControl>
    )
}

export default LanguageSelector