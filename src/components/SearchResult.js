import React from "react"
import "./SearchResult.scss"
import LikeButton from "./LikeButton"
import { Button } from "@mui/material";
import { Link } from "gatsby-plugin-react-i18next";
import {  useI18next } from "gatsby-plugin-react-i18next";
import SearchIcon from '@mui/icons-material/Search'
const SearchResult = (props) => {
    const t = useI18next()
      return(
      <div className="searchResult">
        <div className="searchContent">{props.card.ext_1}</div>
        <div className="searchContent">{props.card.ext_2}</div>
        <div className="searchContent">{props.card.ext_3}</div>
        <div className="searchContent">{props.card.ext_4}</div>
        <div className="searchContent"><Link
                                        style={{color:'white'}}
                                        to={'/card_details/'+props.card.subject}
                                        state={{myCard:props.myCard,topics_id:props.card.topics_id,locale:"locale"}}
                                            ><SearchIcon style={{width:'100%'}}></SearchIcon></Link></div>
      </div>
    )
  }
  
  export default SearchResult