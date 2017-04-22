import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {Room} from "../models/room";

@Injectable()
export class RoomService {

  rooms : FirebaseListObservable<Room[]>;

  constructor(private af: AngularFire) {
    this.rooms = this.af.database.list('/rooms');
  }

  getRooms() : FirebaseListObservable<Room[]>{
    return this.rooms;
  }

  addRoom(){
    const emptyRoom : Room = Room.generateEmptyRoom();
    this.rooms.push(emptyRoom);
  }

  getRoomById(key: string) : FirebaseObjectObservable<Room> {
    return this.af.database.object('/rooms/' + key);
  }

  isDrawer(room: Room): Boolean{
    return true;
  }

}
