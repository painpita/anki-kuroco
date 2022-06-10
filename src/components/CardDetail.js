import React from "react"
import axios from "../../authAxios"
import "./card-details.scss"
import { navigate } from "gatsby";
import { Paper } from "@mui/material";
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
class CardDetail extends React.Component {
  constructor(props){
    super()
    this.state = {
        card:{}
    }
  }
  async componentDidMount(){
    try{
      let cardsReq = await axios.get("/4/card-detail/"+this.props.topics_id)
      await this.setState({card:cardsReq.data.details})
    }
    catch{
      navigate("/profile")
    }
  }

  render(){
    return <Paper className={"paper"}
      sx={{
        backgroundColor:'black',
        color:'white'
      }}
    elevation={8}>
    <Typography variant="" component="h1">
    {this.state.card.ext_1}
    </Typography>
    <Typography variant="" component="h2">
    Meanings : {this.state.card.ext_2}
    </Typography>
    <Typography variant="" component="p">
    Onyomi readings : {this.state.card.ext_3}
    </Typography>
    <Typography variant="" component="p">
    Kunyumi readings : {this.state.card.ext_4}
    </Typography>
    <Typography variant="" component="p">
    Related words : {this.state.card.ext_6}
    </Typography>
    <Typography variant="" component="p">
      <a target="_blank" rel="noreferrer" href={"https://jisho.org/search/%23kanji%20"+this.state.card.ext_1}><SearchIcon className='jishoLink'/></a>
    </Typography>
    </Paper>
  }
}

export default CardDetail