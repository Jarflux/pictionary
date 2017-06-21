/**
 * Created by Ben on 04/05/2017.
 */

import * as firebaseFunctions from 'firebase-functions';
import {GameService} from "../../service/GameService";
import {RoomRepository} from "../../repository/RoomRepository";

export let management = firebaseFunctions.database.ref('/rooms/{roomUid}/players').onWrite(async event => {
  let roomUid = event.params['roomUid'];
  console.log('Users list changed for room ' + roomUid);
  GameService.manageRoom(await RoomRepository.findByUid(roomUid));
});
