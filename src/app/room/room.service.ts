import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {Room} from "../models/room";
import {isNullOrUndefined} from "util";

@Injectable()
export class RoomService {

  currentUserId: string;
  rooms : FirebaseListObservable<Room[]>;


  constructor(private af: AngularFire) {
    this.rooms = this.af.database.list('/rooms');
    this.currentUserId = this.af.auth.getAuth().uid;
  }

  getRooms() : FirebaseListObservable<Room[]>{
    return this.rooms;
  }

  addNewRoom(){
    const emptyRoom : Room = this.generateEmptyRoom();
    this.rooms.push(emptyRoom);
  }

  getRoomById(key: string) : FirebaseObjectObservable<Room> {
    return this.af.database.object('/rooms/' + key);
  }

  updateDrawings(room: FirebaseObjectObservable<Room>, drawLines: string[]){
    room.update({
      currentGameDrawing: drawLines
    });

  }


  isCurrentUserTheArtist(room: Room): boolean{
    return room.artistUid === this.currentUserId;
  }

  isRoomInPlayingMode(room: Room): boolean {
    return !isNullOrUndefined(room) && !isNullOrUndefined(room.startRoundTimestamp);
  }

  private generateEmptyRoom(){
    let emptyRoom = new Room();
    emptyRoom.name = '-';
    emptyRoom.currentGameDrawing = [];

    emptyRoom.createdOn = new Date();
    emptyRoom.createdBy = this.currentUserId;

    return emptyRoom;
  }
}
