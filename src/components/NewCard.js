import React from "react"
import { Paper } from "@mui/material";
import "./new-card.scss"
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { useState } from "react";
import {Slider} from "@mui/material";
import { Button }  from "@mui/material";
import { Typography } from "@mui/material";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import authAxios from "../../authAxios"
import Swal from 'sweetalert2';
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth";
import {Trans, useTranslation} from 'gatsby-plugin-react-i18next';

const NewCard = ({props}) => {
  // Use language iso for the routes
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
      "topics_flg": 1,
      "contents": "azeaze",
      "regular_flg": 0,
      "open_flg": 1,
      "ymd": "2022-06-13",
      "ext_1": formValues.kanji,
      "ext_2": formValues.meanings,
      "ext_3": formValues.on,
      "ext_4": formValues.kun,
      "ext_5": "",
      "ext_6": "",
      "contents_type": formValues.level,
      "validate_only": false
    }
    try{
      let req = await authAxios({
      method:"post",
      url :"6/new",
      //headers: {'Content-Type' : 'application/json'},
      data: body})
      
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
  return (<Paper className={"newCard"}
    sx={{
        color:"white",
      }}
    elevation={8}>
      
      <ValidatorForm className="newCardForm" onSubmit={handleSubmit}>
      <Typography component="h1" variant="">
        <Trans>create_new</Trans>
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
            <TextField 
              multiline 
              className="kanjiInput" 
              type="text"
              name="meanings"
              variant="outlined"
              label={<Trans>meanings</Trans>}
              value={formValues.meanings}
              onChange={handleInputChange}
            />
            <div className="meaningInputsWrapper">
              <TextField 
                multiline 
                className="kanjiInput" 
                label="On" 
                type="text"
                name="on"
                variant="outlined" 
                value={formValues.on}
                onChange={handleInputChange}
              />
              <TextField 
                multiline 
                className="kanjiInput" 
                label="Kun" 
                type="text"
                name="kun"
                variant="outlined" 
                value={formValues.kun}
                onChange={handleInputChange}
              />
            </div>
        </FormControl>
        <div className="sliderWrapper">
        <Trans>difficulty_level</Trans>
        <Slider
          value={formValues.level}
          onChange={handleSliderChange("level")}
          defaultValue={16}
          step={1}
          min={16}
          max={20}
          marks={[
            {
              value: 16,
              label: "1",
            },
            {
              value: 17,
              label: "2",
            },
            {
              value: 18,
              label: "3",
            },
            {
              value: 19,
              label: "4",
            },
            {
              value: 20,
              label: "5",
            },
          ]}
          valueLabelDisplay="off"
          />
        </div>
        <Button type="submit" className="newKanjiButton">
          <Trans>save</Trans>²
        </Button>
        </ValidatorForm >
      </Paper>
    )
} 

export default NewCard