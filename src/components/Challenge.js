import React, {useState} from "react"
import {  useI18next } from "gatsby-plugin-react-i18next";
import { isLoggedIn } from "../services/auth"

const Challenge = (props) => {

    const [message, setMessage] = useState("")

    const socket = new WebSocket('ws://localhost:8081');

    socket.onopen = async function(e) {
      let user = await isLoggedIn();
      if(user) socket.send(user.email);
    };
    
    socket.onmessage = function(event) {
      setMessage(event.data);
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

    const sendGameRequest = () => {
      socket.send("GAME_REQUEST");
    }

    const t = useI18next()
      return(
      <div>Hello World !!
               <button onClick={sendGameRequest}>Send hello</button>
               <p>Message : {message}</p>
      </div>
    )
  }
  
  export default Challenge