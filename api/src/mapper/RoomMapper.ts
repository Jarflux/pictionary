/**
 * Created by Ben on 04/05/2017.
 */
import * as firebase from 'firebase/app'
import {Room} from "../model/Room";

export class RoomMapper {

  static toModel(dataSnapShot: firebase.database.DataSnapshot): Room{
    let room = new Room();
    room.setUid(dataSnapShot.key);
    room.setName(dataSnapShot.child("name").val())
    room.setArtistUid(dataSnapShot.child("artistUid").val())
    room.setGameState(dataSnapShot.child("gameState").val())
    room.setStartRoundTimestamp(dataSnapShot.child("startRoundTimestamp").val())
    room.setWordUId(dataSnapShot.child("wordUid").val())
    return room;
  }

  static toObject(room: Room): Object{
    return {
      name: room.getName(),
      artistUid: room.getArtistUid(),
      gameState: room.getGameState().valueOf(),
      startRoundTimestamp: room.getStartRoundTimestamp(),
      wordUid: room.getUid()
    };
  }

}
