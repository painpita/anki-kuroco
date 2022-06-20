import React from "react"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { navigate } from "gatsby";
import { useIntl } from "gatsby-plugin-intl";
import { Link } from "gatsby";
import ReactCountryFlag from "react-country-flag"

import {
    IconFlagUK,
    IconFlagFR
  } from 'material-ui-flags';
  
const LanguageSelector = () => {

  const intl = useIntl()
  // Use language iso for the routes
  const locale = intl.locale !== "en" ? `/${intl.locale}` : "/"

    const handleChange = (event) =>{
      event.preventDefault()
      console.log(event.target.value)
      navigate(locale)
    }
    return (
        <FormControl variant="standard">
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Language"
          defaultValue={locale}
          onClose = {()=>{}}
        >
          <Link value="/" to='/' style={{ textDecoration: 'none' }}>
            <MenuItem value="/"> <ReactCountryFlag countryCode="GB" /></MenuItem>
          </Link>
          <Link value="/fr" to='/fr' style={{ textDecoration: 'none' }}>
            <MenuItem><ReactCountryFlag countryCode="FR" /></MenuItem>
          </Link>
          <Link value="/jp" to='/jp' style={{ textDecoration: 'none' }}>
            <MenuItem><ReactCountryFlag countryCode="JP" /></MenuItem>
          </Link>
        </Select>
      </FormControl>
    )
}

export default LanguageSelector