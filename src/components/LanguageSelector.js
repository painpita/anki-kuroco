import React from "react"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { navigate } from "gatsby";
import { Link, useI18next } from "gatsby-plugin-react-i18next";
import ReactCountryFlag from "react-country-flag"
import { translate } from "react-i18next"
const LanguageSelector = () => {
    const t = useI18next()
    const {languages, changeLanguage} = useI18next();

    const handleChangeLanguage = (e) => {
      changeLanguage(e.target.value)
    }
  
    return (
        <FormControl variant="standard">
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Language"
          defaultValue={t.language}
          onChange= {handleChangeLanguage}
        >
            <MenuItem value="en"> <ReactCountryFlag countryCode="GB" /></MenuItem>
            <MenuItem value="fr"><ReactCountryFlag countryCode="FR" /></MenuItem>
            <MenuItem value="jp"><ReactCountryFlag countryCode="JP" /></MenuItem>
        </Select>
      </FormControl>
    )
}

export default LanguageSelector
