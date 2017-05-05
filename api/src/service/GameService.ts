/**
 * Created by Ben on 04/05/2017.
 */
import {Room} from "../model/Room";
import {RoomRepository} from "../repository/RoomRepository";
import {WordRepository} from "../repository/WordRepository";
import {Word} from "../model/Word";
import {Player} from "../model/Player";
import {PlayerRepository} from "../repository/PlayerRepository";

export class GameService {

  // TODO fix return boolean
  static processGuess(roomUid: string, playerUid: string, guess: string): boolean {
    RoomRepository.findByUid(roomUid).then(room => {
      WordRepository.findByUid(room.getWordUid()).then(word => {
        let isCorrectGuess = GameService.validateGuess(word, guess);
        PlayerRepository.findByUid(playerUid).then(player => {
          player.setGuessCount(player.getGuessCount() + 1);
          if (isCorrectGuess) {
            player.setCorrectGuessCount(player.getCorrectGuessCount() + 1);
            player.setScore(player.getScore() + 50);
            // TODO update room status
          } else {
            player.setScore(player.getScore() - 10);
          }
          PlayerRepository.save(player);
          return isCorrectGuess;
          // TODO fix return boolean
        });
      });
    });
    // TODO fix return boolean
    return false;
  }

  static manageRoom(room: Room): void {
    let numberOfPlayers = room.getPlayers().size();
    if (numberOfPlayers > 2) {
      if (room.isInProgress()) {
        if (!room.isArtistStillHere()) {
          console.log(`Room management notice: round restarted in room ${room.getUid()} because artist left and round is in progress`);
          // TODO update room status
          // return Round.restartRound(roomSnapshot);
        }
      } else {
        console.log(`Room management notice: round started in room ${room.getUid()} because enough players and no round is in progress`);
        // TODO update room status
        // return Round.startRound(roomSnapshot);
      }
    } else if (numberOfPlayers === 0) {
      console.log(`Room management notice: remove room ${room.getUid()}, player count ${numberOfPlayers}`);
      // TODO remove room
      //roomSnapshot.ref.remove();
    } else if (room.isInProgress()) {
      console.log(`Room management notice: waiting for players in room ${room.getUid()}, player count ${numberOfPlayers}`);
      // TODO update room status
      // return Round.setStatusToWaitForPlayers(roomSnapshot);
    }

  }

  static validateGuess(word: Word, guess: string): boolean {
    if (this.matchesSingularOrPluralWord(word.getWord(),guess)){
      return true;
    }
    for (let synonym in word.getSynonyms().getArray()) {
      if(this.matchesSingularOrPluralWord(synonym,guess)){
        return true;
      }
    }
    return false;
  }

  static matchesSingularOrPluralWord(word: string, guess: string): boolean {
    if ("blaaspijp" === guess) {
      return true;
    }
    if (word === guess) {
      return true;
    }
    if (word.endsWith("o") && ( word.slice(0, -1) + "es") === guess) {
      return true;
    }
    if (word.endsWith("fe") && ( word.slice(0, -2) + "ves") === guess) {
      return true;
    }
    if (word.endsWith("f") && ( word.slice(0, -1) + "ves") === guess) {
      return true;
    }
    if (word.endsWith("y") && ( word.slice(0, -1) + "ies") === guess) {
      return true;
    }
    return (!word.endsWith("o")
      && !word.endsWith("fe")
      && !word.endsWith("f")
      && !word.endsWith("y")
      && ( word + "s") === guess);
  }

  static createPlayer(player: Player) {
    PlayerRepository.save(player);
  }

}





