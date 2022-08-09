const WebSocketServer = require('ws');
const Game = require('./classes/Game.ts').Game;
const wss = new WebSocketServer.Server({ port: 8081 });

let clientList = {}

const storeClients = (username, client) => {
  clientList[username] = client;
}

const startGame = (userName1, client1, userName2, client2) => {
  new Game(userName1, client1, userName2, client2);
}

const sendGameRequest = (userName2) => {
  if(userName2 in clientList.keys){
    console.log("sending request")
    clientList[userName2].send('GAME_REQUEST');
  }
}

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    switch(data) {
      case 'CONN' : 
        ws.storeClients(data);
        break;
      case 'GAME_REQUEST' :
        sendGameRequest('blabla');
        break;
      case 'GAME_ACCEPTED' :
        startGame();
        break;
    }    
  });

  ws.send('Connection accepted');
});