import React from "react"
import { Link } from "gatsby-plugin-react-i18next";
import {  useI18next } from "gatsby-plugin-react-i18next";
import SearchIcon from '@mui/icons-material/Search';
import WebSocket from 'ws';
import Challenge from "./Challenge";
const ChallengeContainer = (props) => {


    const ws = new WebSocket('ws://localhost:8081');


    const t = useI18next()
      return(
        <Challenge></Challenge>
    )
  }
  
  export default ChallengeContainer