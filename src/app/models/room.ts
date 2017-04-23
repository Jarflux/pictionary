import {RoomPlayer} from "./players";
import {DrawLine} from "./draw-line";
import {Guess} from "./guess";

export class Room {
  name: string;
  artistUid: string;
  winnerUid: string;

  startRoundTimestamp: Date;

  players: RoomPlayer[];
  guesses: Guess[];

  currentGameDrawing: DrawLine[];

  createdOn: Date;
  createdBy: string;
}
