export class Game {
    player1 : Player;
    player2 : Player;
    constructor(userName1, client1, userName2, client2){
        console.log("launching new game !!!")
        this.player1 = new Player(userName1, client1);
        this.player2 = new Player(userName2, client2);
    }

    refreshCards = () => {

    }
    
    registerPoint = (player) => {
        
    }
}