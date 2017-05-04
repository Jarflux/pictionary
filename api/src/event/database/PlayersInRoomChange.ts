/**
 * Created by Ben on 04/05/2017.
 */

import * as firebaseFunctions from 'firebase-functions';
import {GameService} from "../../service/GameService";
import {RoomMapper} from "../../mapper/RoomMapper";

export let management = firebaseFunctions.database.ref('/rooms/{roomUid}/players').onWrite(async event => {
  GameService.manageRoom(RoomMapper.toModel(await event.data.adminRef.parent.once("value")));
});
