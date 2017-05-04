/**
 * Created by Ben on 04/05/2017.
 */
import * as firebase from 'firebase/app'
import {Player} from "../model/Player";

export class PlayerMapper {

  static toModel(dataSnapShot: firebase.database.DataSnapshot): Player{
    let player = new Player();
    player.setUid(dataSnapShot.key);
    player.setName(dataSnapShot.child("name").val())
    player.setCorrectGuessCount(dataSnapShot.child("secure/correctGuessCount").val())
    player.setGuessCount(dataSnapShot.child("secure/guessCount").val())
    player.setScore(dataSnapShot.child("secure/score").val())
    return player;
  }

  static toObject(player: Player): Object{
    return {
      name: player.getName(),
      secure: {
        correctGuessCount: player.getCorrectGuessCount(),
        guessCount: player.getGuessCount(),
        score: player.getScore()
      }
    };
  }

}
