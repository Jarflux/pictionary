import {RoomPlayer} from "./players";
import {DrawLine} from "./draw-line";
import {Guess} from "./guess";
import {IArrayByPlayerId} from "./interfaces";


export class Room {
  name: string;
  artistUid: string;
  winnerUid: string;

  startRoundTimestamp: Date;

  players: IArrayByPlayerId<RoomPlayer>;
  guesses: IArrayByPlayerId<Guess>;

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
