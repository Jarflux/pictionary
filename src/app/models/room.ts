import {RoomPlayer} from "./players";

export class Room {
  name: string;
  artistUid: string;
  winnerUid: string;
  startRoundTimestamp: Date;

  players: RoomPlayer[];

  currentGameDrawing: string[];

  createdOn: Date;
  createdBy: string;
}
