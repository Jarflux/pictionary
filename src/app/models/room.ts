import {UserProfile} from "./user-profile";
export class Room {
  name: string;
  players: UserProfile[];

  currentGameDrawing: string[];
  currentGameDrawer: UserProfile;
  currentGameEndTimeStamp: Date;

  createdOn: Date;
  createdBy: UserProfile;


  constructor(){
  }

  static generateEmptyRoom(){
    let emptyRoom = new Room();
    emptyRoom.name = '';
    emptyRoom.currentGameDrawing = [];
    emptyRoom.createdOn = new Date();

    return emptyRoom;
  }

}
