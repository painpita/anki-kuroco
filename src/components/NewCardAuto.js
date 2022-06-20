import React from "react"
import { Paper } from "@mui/material";
import "./new-card.scss"
import { FormControl } from '@mui/material';
import { useState } from "react";
import { Button }  from "@mui/material";
import { Typography } from "@mui/material";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import authAxios from "../../authAxios"
import Swal from 'sweetalert2';
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth";
import { useIntl } from "gatsby-plugin-intl";

const NewCardAuto = ({props}) => {
  const intl = useIntl()
  // Use language iso for the routes
  const locale = intl.locale !== "en" ? `/${intl.locale}` : ""
  try{
    isLoggedIn()
  }
  catch{
    navigate('/profile')
  }

  const defaultValues = {
    kanji: "",
    meanings: "",
    on: "",
    kun: "",
    level: 0,
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    let body = {
      "subject": formValues.kanji,
      "slug": "",
      "contents_type": 15,
      "topics_flg": 1,
      "contents": "azeaze",
      "regular_flg": 0,
      "open_flg": 1,
      "ymd": "2022-06-13",
      "ext_1": formValues.kanji,
      "ext_5": "",
      "ext_6": "",
      "validate_only": false
    }
    try{
      let req = await authAxios({
      method:"post",
      url :"6/auto-card",
      //headers: {'Content-Type' : 'application/json'},
      data: body})
      console.log(req)
      let result = await  Swal.fire({
        title: intl.formatMessage({ id: "congratulations" }),
        text: intl.formatMessage({ id: "new_card_created" }),
        icon: 'success',
        confirmButtonText: intl.formatMessage({ id: "check_it_out" })
      })
      console.log(req.data.id)
      navigate('/card_details/'+req.data.id, {state:{myCards:true, topics_id:req.data.id}})
    }
    catch(e){
      Swal.fire({
        title: 'Error !',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: ':('
      })
      
    }
    console.log(body)
  }

  const handleSliderChange = (name) => (e, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const [formValues, setFormValues] = useState(defaultValues)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  return (
  <Paper className={"newCard"}
    sx={{
        color:"white",
      }}
    elevation={8}>
      
      <ValidatorForm className="newCardForm" onSubmit={handleSubmit}>
      <Typography component="h1" variant="">
      {intl.formatMessage({ id: "create_new_automatic" })}
      </Typography>
        <FormControl>
            <TextValidator
              className="kanjiInput" 
              label="Kanji" 
              type="text"
              name="kanji"
              variant="outlined" 
              validators={['required']}
              errorMessages={['This field is required']}
              value={formValues.kanji}
              onChange={handleInputChange}
            />
        </FormControl>
        <Button type="submit" className="newKanjiButton">
          {intl.formatMessage({ id: "save" })}
        </Button>
        </ValidatorForm >
      </Paper>
    )
} 


export default NewCardAuto