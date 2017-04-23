import {RoomPlayer} from "./players";
import {DrawLine} from "./draw-line";

export class Room {
  name: string;
  artistUid: string;
  winnerUid: string;

  startRoundTimestamp: Date;

  players: RoomPlayer[];

  currentGameDrawing: DrawLine[];

  createdOn: Date;
  createdBy: string;
}
