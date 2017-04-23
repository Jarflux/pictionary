import {DrawLine} from "./draw-line";
import {IArrayByPlayerId} from "./interfaces";


export class Room {
  name: string;
  artistUid: string;
  winnerUid: string;

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
