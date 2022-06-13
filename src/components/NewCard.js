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
const NewCard = ({props}) => {
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
      "ext_2": formValues.meanings,
      "ext_3": formValues.on,
      "ext_4": formValues.kun,
      "ext_5": "",
      "ext_6": "",
      "validate_only": false
    }
    try{
      let req = await authAxios({
      method:"post",
      url :"6/new",
      //headers: {'Content-Type' : 'application/json'},
      data: body})
      let result = await  Swal.fire({
        title: 'おめでとうございます。!',
        text: 'Your new card has been created',
        icon: 'success',
        confirmButtonText: "Let's check it out !"
      })
      console.log(req.data.id)
      navigate('/card_details/'+req.data.id)
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
  <Paper className={"paper"}
    sx={{
        color:"white",
      }}
    elevation={8}>
      <Typography component="h1" variant="">
        Create a new card 
      </Typography>
      <ValidatorForm onSubmit={handleSubmit}>
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
              label="Meanings" 
              type="text"
              name="meanings"
              variant="outlined"
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
        Difficulty level
        <Slider
          value={formValues.level}
          onChange={handleSliderChange("level")}
          defaultValue={1}
          step={1}
          min={1}
          max={5}
          marks={[
            {
              value: 1,
              label: "1",
            },
            {
              value: 2,
              label: "2",
            },
            {
              value: 3,
              label: "3",
            },
            {
              value: 4,
              label: "4",
            },
            {
              value: 5,
              label: "5",
            },
          ]}
          valueLabelDisplay="off"
          />
        </div>
        <Button type="submit" className="newKanjiButton">
          Save
        </Button>
        </ValidatorForm >
    </Paper>
    )
} 


export default NewCard