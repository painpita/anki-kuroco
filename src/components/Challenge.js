import React, {useEffect, useState} from "react"
import {  useI18next } from "gatsby-plugin-react-i18next";
import { isLoggedIn } from "../services/auth"

const Challenge = (props) => {

    const [message, setMessage] = useState("")
    const [clientList, setClientList] = useState([])

    const socket = new WebSocket('ws://localhost:8081');

    useEffect(()=>{},[message,clientList]);
    socket.onopen = async () =>  {
      console.log("opening")
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
            //setClientList(JSONObject.data);
          break;
        case 'INFO' :
          setMessage(JSONObject.data);
          break;
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

    const sendGameRequest = (userName2) => {
      socket.send(JSON.stringify({type:"GAME_REQUEST", data:userName2}));
    }

    const getClients = () => {
      socket.send(JSON.stringify({type:'GET_CLIENTS'}))
    }
    
    const displayClients = ''
    const t = useI18next()
      return(
      <div>Hello World !!
               <button onClick={sendGameRequest}>Send hello</button>
               <p>Message : {message}</p>
               <ul>
                {/* clientList.map((client)=><li key={client}>{client}</li>) */}
              </ul>
      </div>
    )

  }
  
  export default Challenge