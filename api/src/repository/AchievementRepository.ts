/**
 * Created by Ben on 04/05/2017.
 */
import * as firebaseAdmin from "firebase-admin";
import {PlayerMapper} from "../mapper/PlayerMapper";
import {Player} from "../model/Player";
import {Achievement} from "../model/Achievement";
import {List} from "../model/List";
import {AchievementMapper} from "../mapper/AchievementMapper";

export class AchievementRepository {

  static findAll(): Promise<List<Achievement>> {
    return firebaseAdmin.database().ref(`/achievements`).once('value').then(snapshot => {
      return AchievementMapper.toModelList(snapshot.toJSON())
    });
  }

  static save(player: Player): void {
    firebaseAdmin.database().ref(`/playerInfo/${player.getUid()}`).update(PlayerMapper.toObject(player));
  }

}


