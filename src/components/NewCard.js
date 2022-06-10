import React from "react"
import { Paper } from "@mui/material";
import "./new-card.scss"
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { useState } from "react";
import {Slider} from "@mui/material";
const NewCard = ({props}) => {
  const defaultValues = {
    kanji: "",
    meanings: 0,
    on: "",
    kun: "",
    level: 0,
  };
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
        <FormControl>
            <TextField className="kanjiInput" label="Kanji" variant="outlined" />
            <TextField className="kanjiInput" label="Meanings" variant="outlined" />
            <TextField className="kanjiInput" label="On" variant="outlined" />
            <TextField className="kanjiInput" label="Kun" variant="outlined" />
        </FormControl>
        Level
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
    </Paper>
    )
}


export default NewCard