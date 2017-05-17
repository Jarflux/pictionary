/**
 * Created by Ben on 04/05/2017.
 */
import * as firebaseAdmin from 'firebase-admin';
import {PlayerMapper} from "../mapper/PlayerMapper";
import {Player} from "../model/Player";

export class PlayerRepository {

  static findByUid(playerUid: string): Promise<Player> {
    return firebaseAdmin.database().ref(`/playerInfo/${playerUid}`).once('value').then(snapshot => { return PlayerMapper.toModel(snapshot.toJSON())});
  }

  static save(player: Player): void{
    firebaseAdmin.database().ref(`/playerInfo/${player.getUid()}`).update(PlayerMapper.toObject(player));
  }

}


