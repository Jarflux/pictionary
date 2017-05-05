/**
 * Created by Ben on 04/05/2017.
 */

import * as firebaseFunctions from 'firebase-functions';
import {GameService} from "../../service/GameService";
import {Player} from "../../model/Player";

export let createPlayerInfoOnRegister = firebaseFunctions.auth.user().onCreate(async event => {
  let player = new Player();
  player.setUid(event.data['uid']);
  player.setName(event.data['displayName']);
  player.setScore(0);
  player.setCorrectGuessCount(0);
  player.setGuessCount(0);
  GameService.createPlayer(player);
});
