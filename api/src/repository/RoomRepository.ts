/**
 * Created by Ben on 04/05/2017.
 */
import * as firebaseAdmin from 'firebase-admin';
import {RoomMapper} from "../mapper/RoomMapper";
import {Room} from "../model/Room";

export class RoomRepository {

  static findByUid(roomUid: string): Promise<Room> {
    return firebaseAdmin.database().ref(`/rooms/${roomUid}`).once('value').then(snapshot => { return RoomMapper.toModel(snapshot.val())});
  }

  static save(room: Room): void{
    firebaseAdmin.database().ref(`/rooms/${room.getUid()}`).update(RoomMapper.toObject(room));
  }

  static remove(room: Room): void{
    firebaseAdmin.database().ref(`/rooms/${room.getUid()}`).remove();
  }
}
