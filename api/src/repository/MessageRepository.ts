/**
 * Created by Ben on 04/05/2017.
 */
import * as firebaseAdmin from 'firebase-admin';
import {MessageMapper} from "../mapper/MessageMapper";
import {Room} from "../model/Room";
import {Message} from "../model/Message";

export class MessageRepository {

  static add(room: Room, message: Message): void{
    firebaseAdmin.database().ref(`/rooms/${room.getUid()}/messages`).push(MessageMapper.toObject(message));
  }

}


