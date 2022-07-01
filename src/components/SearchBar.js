import React, {useState, useEffect} from "react"
import authAxios from "../../authAxios";
import SearchResult from "./SearchResult"
import _ from "lodash"
import { IconButton, OutlinedInput, TextField } from "@mui/material";
import "./SearchBar.scss"
import {InputAdornment} from "@mui/material";
import { Close } from "@mui/icons-material";
const SearchBar = () => {

    const [ value, setValue ] = useState("")
    const [ cards, setCards ] = useState()

    function clearSearch(){
      console.log("clear search")
      setCards(<></>)
    }

    const resetValue = () => {
      console.log("reset value")
      setValue("")
      clearSearch()
    }

    function debounce(func, timeout = 1000){
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
      };
    }
    
    async function fetchCards(event){
      console.log("got here")
      const newValue = event.target.value
      if(newValue==="") {clearSearch(); return}
      let URL = '4/cards?filter=ext_2%20istartswith%20%22 + ' + newValue + '%22 OR ext_1%20icontains%20%22' + newValue + '%22&cnt=' + 5
      let {data} = await authAxios.get(URL)
      if(Array.isArray(data.list)&&data.list.length>0) setCards(data.list.map(value=><SearchResult key={value.topics_id} card={value}></SearchResult>))
    }
    
    const processChange = debounce((newValue) => fetchCards(newValue))
  

    const searchBarContainer = (cards&&cards.length)>0 ? <div className="searchResultContainer" style={{"color":"black"}}>{cards}</div> : <div></div>
    return (
      <div className="searchContainer">
          <OutlinedInput
            placeholder="Input meaning or Kanji"
            value={value}
            onKeyDown={processChange}
            onChange={(event)=>setValue(event.target.value)}
            style={{width:"60%"}}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear input"
                  onClick={resetValue}
                  edge="end"
                >
                  <Close></Close>
                </IconButton>
              </InputAdornment>
            }

          />
          {searchBarContainer}
        </div>
      );
}

export default SearchBar
