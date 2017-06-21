/**
 * Created by Ben on 04/05/2017.
 */

import * as firebaseFunctions from 'firebase-functions';
import {AchievementService} from "../../service/AchievementService";
import {PlayerRepository} from "../../repository/PlayerRepository";

export let awardAchievements = firebaseFunctions.database.ref('/playerInfo/{playerUid}/metrics').onWrite(async event => {
  let playerUid = event.params['playerUid'];
  console.log('Metrics changed for player ' + playerUid);
  AchievementService.awardAchievements(await PlayerRepository.findByUid(playerUid));
});
