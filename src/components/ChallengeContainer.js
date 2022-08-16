import React, {useEffect, useState} from "react"
import {  useI18next } from "gatsby-plugin-react-i18next";
import { isLoggedIn } from "../services/auth"
import Swal from 'sweetalert2';
import { navigate } from "gatsby";
const Challenge = (props) => {

  const socket = new WebSocket('ws://localhost:8081');

    const [gameId, setGameId] = useState()
    const [message, setMessage] = useState("")
    const [clientList, setClientList] = useState([])
    const [user, setUser] = useState({})
    const [cards, setCards] = useState([])
    const [meaning, setMeaning] = useState("")

    useEffect(() => {
      let getUser = null;
      socket.onopen = async ()  => {
        getUser = await isLoggedIn()
        await setUser(getUser);
        if(getUser){
          socket.send(JSON.stringify({type:'CONN', data : getUser.email}))
          getClients()
        };
      };
      
      socket.onmessage = function(event) {
        let JSONObject = JSON.parse(event.data);
        switch(JSONObject.type){
          case 'CLIENT_LIST' :
              setClientList(JSONObject.data);
            break;
          case 'INFO' :
            setMessage(JSONObject.data);
            break;
            case 'NEW_ROUND' :
            setCards(JSONObject.data.cards);
            setMeaning(JSONObject.data.meaning)
            break;
          case 'GAME_START' :
            setGameId(JSONObject.data.gameId);
            break;
            case 'GAME_START' :
              handleGameData(JSONObject.data);
              break;
  
          case 'GAME_REQUEST':
            Swal.fire({
              title: `Game request !`,
              text: `${JSONObject.data} challenged you !`,
              icon: 'warning',
              confirmButtonText: 'Accept'
            }).then(value=>{
              if(value.isConfirmed) {
                socket.send(JSON.stringify({type:'GAME_ACCEPTED', data: {userName1 : JSONObject.data, userName2 : getUser.email}}))
              }
            })
            break;
          default:
            window.alert(`Got default case with ${JSONObject.type}`)
        }
      };

      socket.onclose = function(event) {
        if (event.wasClean) {
          alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
          // par exemple : processus serveur arrêté ou réseau en panne
          // event.code est généralement 1006 dans ce cas
          alert('[close] Connection died');
        }
      };
      
      socket.onerror = function(error) {
        alert(`[error] ${error.message}`);
      };
   }, []);
      

      
    const sendGameRequest = (e) => {
      socket.send(JSON.stringify({type:"GAME_REQUEST", data:{userName2 : e.target.value, userName1 : user.email}}));
    }

    const getClients = () => {
      socket.send(JSON.stringify({type:'GET_CLIENTS'}))
    }   
    
    const sendHello = () => {
      socket.send(JSON.stringify({type : 'Hello'}))
    }

    const sendAnswer = (e) => {
      socket.send(JSON.stringify({type:'ANSWER', data : {gameId : gameId, userId : user, answer : e.target.value}}))
    }

    const handleGameData = (message) => {
      switch(message){
        case 'ROUND_WON':
          Swal.fire({
            title: `You won !`,
            text: `So good... woaw !`,
            icon: 'success',
            confirmButtonText: 'Accept'
          })
          break;
        case 'ROUND_LOST':
          Swal.fire({
            title: `You lost the round !`,
            text: `Your opponent is just better !`,
            icon: 'warning',
            confirmButtonText: 'Accept defeat'
          })
          break;
        case 'WRONG_ANSWER':
          Swal.fire({
            title: `Wrong answer !`,
            text: `:()`,
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
          break;
      }
    }
    
    const t = useI18next()
      return(
      <div>Hello World !!
               <p>Message : {message}</p>
               <ul>
                {clientList.map((client)=><li key={client}>{client} 
                {client != user.email ? <button value={client} onClick={sendGameRequest.bind(client)}>Game request</button> : ""}
                </li>)}
              </ul>
              <ul>
                {cards.map((card)=><button onClick={sendAnswer.bind(card.ext_2)} value={card.ext_2} key={card.ext_1}>{card.ext_1}</button>)}
              </ul>
              <button onClick={sendHello}>Send hello</button>
              <div>{meaning}</div>
      </div>
    )

  }
  
  export default Challenge