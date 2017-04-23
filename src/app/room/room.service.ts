import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {Room} from "../models/room";
import {isNullOrUndefined} from "util";
import {DrawLine} from "../models/draw-line";
import {IArrayByPlayerId} from "../models/interfaces";
import * as firebase from "firebase/app";
import ThenableReference = firebase.database.ThenableReference;

@Injectable()
export class RoomService {

  currentUserId: string;
  rooms: FirebaseListObservable<Room[]>;


  constructor(private af: AngularFire) {
    this.rooms = this.af.database.list('/rooms');
    this.currentUserId = this.af.auth.getAuth().uid;
  }

  getRooms(): FirebaseListObservable<Room[]> {
    return this.rooms;
  }

  addNewRoom() : any {
    const emptyRoom: Room = this.generateEmptyRoom();
    return this.rooms.push(emptyRoom);
  }

  getRoomById(key: string): FirebaseObjectObservable<Room> {
    return this.af.database.object('/rooms/' + key);
  }

  clearCurrentGameDrawing(room: FirebaseObjectObservable<Room>) {
    room.update({
      currentGameDrawing: []
    });  }

  updateCurrentGameDrawing(room: FirebaseObjectObservable<Room>, drawLines: DrawLine[]) {
    room.update({
      currentGameDrawing: drawLines
    });
  }

  enterRoom(roomUid: string) {
    this.af.database.object(`/rooms/${roomUid}/players/${this.currentUserId}`).set(this.currentUserId);
  }

  leaveRoom(roomUid: string) {
    this.af.database.object(`/rooms/${roomUid}/players/${this.currentUserId}`).remove();
  }

  guess(roomUid: string, guess: string) {
    this.af.database.object(`/rooms/${roomUid}/guesses/${this.currentUserId}`).set(guess);
  }

  isCurrentUserTheArtist(room: Room): boolean {
    return room.artistUid === this.currentUserId;
  }

  isRoomInPlayingMode(room: Room): boolean {
    return !isNullOrUndefined(room) && room.gameState === "RUNNING";
  }

  isRoomInStoppedMode(room: Room): boolean {
    return !isNullOrUndefined(room) && room.gameState === "STOPPED";
  }

  isRoomInWaitingMode(room: Room): boolean {
    return !isNullOrUndefined(room) && room.gameState === "WAITING";
  }

  private generateEmptyRoom() {
    let emptyRoom = new Room();

    emptyRoom.name = '-';
    emptyRoom.currentGameDrawing = [];
    emptyRoom.createdOn = new Date();
    emptyRoom.createdBy = this.currentUserId;
    emptyRoom.gameState = "WAITING";
    emptyRoom.players = this.addPlayerToRoom(emptyRoom.players, this.currentUserId);

    return emptyRoom;
  }

  addPlayerToRoom(players: IArrayByPlayerId<string>, playerUid: string) : IArrayByPlayerId<string>{
    if (isNullOrUndefined(players[playerUid])){
      players[playerUid] = playerUid;
    }

    return players;
  }
}
