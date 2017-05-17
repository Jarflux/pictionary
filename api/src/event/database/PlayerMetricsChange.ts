/**
 * Created by Ben on 04/05/2017.
 */

import * as firebaseFunctions from 'firebase-functions';
import {PlayerMapper} from "../../mapper/PlayerMapper";
import {AchievementService} from "../../service/AchievementService";

export let awardAchievements = firebaseFunctions.database.ref('/playerInfo/{playerUid}/metrics').onWrite(async event => {
  AchievementService.awardAchievements(PlayerMapper.toModel(event.data.adminRef.parent.toJSON()));
});
