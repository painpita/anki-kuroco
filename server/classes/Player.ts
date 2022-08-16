export class Player {

    username : string;
    client : WebSocket;
    points : number;

    constructor(username, client){
        this.username = username;
        this.client = client;
        this.points = 0;
    }
    
    getAPoint = () => {
        this.points++; 
    }
}
