export interface GameRoom{
    id : string,
    name : string,
    player1_id : string,
    player2_id : string,
    player1_shots : string,
    player2_shots : string,
    player1_board : string,
    player2_board : string,
    player1_ready : boolean,
    player2_ready : boolean,
    winner_id : string,
  }