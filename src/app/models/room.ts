import {DrawLine} from "./draw-line";
import {IArrayByPlayerId} from "./interfaces";


export class Room {
  name: string;
  gameState: string;
  artistUid: string;
  winnerUid: string;
  wordUid: string;

  startRoundTimestamp: Date;

  players: IArrayByPlayerId<string>;
  guesses: IArrayByPlayerId<string>;

  currentGameDrawing: DrawLine[];

  createdOn: Date;
  createdBy: string;

  constructor(){
    this.players = {};
    this.guesses = {};
    this.currentGameDrawing = [];
    this.createdOn = new Date();
  }
}
