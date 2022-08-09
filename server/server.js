const WebSocketServer = require('ws');
//const Game = require('./classes/Game.ts').Game;
const wss = new WebSocketServer.Server({ port: 8081 });

let clientList = {}

const storeClient = (username, client) => {
  clientList[username] = client;
}

const startGame = (userName1, client1, userName2, client2) => {
  //new Game(userName1, client1, userName2, client2);
}

const sendGameRequest = (userName2) => {
  if(userName2 in clientList.keys()){
    clientList[userName2].send(JSON.stringify({type:'GAME_REQUEST', data:userName2}));
  }
}

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    JSONObject = JSON.parse(data);
    switch(JSONObject.type) {
      case 'CONN' : 
        storeClient(JSONObject.data, ws);
        break;
      case 'GAME_REQUEST' :
        sendGameRequest(JSONObject.data);
        break;
      case 'GAME_ACCEPTED' :
        startGame();
        break;
      case 'GET_CLIENTS':
        ws.send(JSON.stringify({type:'CLIENT_LIST',data:Object.keys(clientList)}))
        break;
    }    
  });

  ws.send(JSON.stringify({type:'INFO', data:'Connection accepted'}));
});