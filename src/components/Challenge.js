import React, {useEffect, useState} from "react"
import {  useI18next } from "gatsby-plugin-react-i18next";
import { isLoggedIn } from "../services/auth"
import Swal from 'sweetalert2';
import { navigate } from "gatsby";
const Challenge = (props) => {

    const [message, setMessage] = useState("")
    const [clientList, setClientList] = useState([])
    
    const socket = new WebSocket('ws://localhost:8081');


    useEffect(() => {
      socket.onopen = async ()  => {
        let user = await isLoggedIn();
        if(user){
          socket.send(JSON.stringify({type:'CONN', data : user.email}))
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
          case 'GAME_REQUEST':
            Swal.fire({
              title: `Game request !`,
              text: `${JSONObject.data} challenged you !`,
              icon: 'warning',
              confirmButtonText: 'Accept'
            }).then(value=>{
              if(value.isConfirmed) {
                socket.send(JSON.stringify({type:'GAME_ACCEPTED'}))
              }
            })
            break;
          default:
            window.alert(`Got default case with ${JSONObject.type}`)
        }
      };

      socket.onclose = function(event) {
        console.log("on close")
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
      socket.send(JSON.stringify({type:"GAME_REQUEST", data:e.target.value}));
    }

    const getClients = () => {
      socket.send(JSON.stringify({type:'GET_CLIENTS'}))
    }   
    
    const t = useI18next()
      return(
      <div>Hello World !!
               <p>Message : {message}</p>
               <ul>
                {clientList.map((client)=><li key={client}>{client} <button value={client} onClick={sendGameRequest.bind(client)}>Game request</button></li>)}
              </ul>
              <button onClick={sendGameRequest}>Send hello</button>
      </div>
    )

  }
  
  export default Challenge