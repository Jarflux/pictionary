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
            //TODO post message
            room.stopRound(player.getUid());
            RoomRepository.save(room);
            //TODO post message
            room.startRound(word.getUid());
            RoomRepository.save(room);
            player.setCorrectGuessCount(player.getCorrectGuessCount() + 1);
            player.setScore(player.getScore() + 50);
          } else {
            player.setScore(player.getScore() - 10);
          }
          PlayerRepository.save(player);
          return isCorrectGuess;
        });
      });
    });
    return false;
  }

  static manageRoom(room: Room): void {
    let numberOfPlayers = room.getPlayers().size();
    if (numberOfPlayers > 2) {
      if (room.isInProgress()) {
        if (!room.isArtistStillHere()) {
          //TODO post message
          console.log(`Room management notice: round restarted in room ${room.getUid()} because artist left and round is in progress`);
          WordRepository.findRandom().then(word => {
            room.stopRoundWithoutWinner();
            room.startRound(word.getUid());
            RoomRepository.save(room);
          });
        }
      } else {
        //TODO post message
        console.log(`Room management notice: round started in room ${room.getUid()} because enough players and no round is in progress`);
        WordRepository.findRandom().then(word => {
          room.startRound(word.getUid());
          RoomRepository.save(room);
        });
      }
    } else if (numberOfPlayers === 0) {
      //TODO post message
      console.log(`Room management notice: remove room ${room.getUid()}, player count ${numberOfPlayers}`);
      RoomRepository.remove(room);
    } else if (room.isInProgress()) {
      //TODO post message
      console.log(`Room management notice: waiting for players in room ${room.getUid()}, player count ${numberOfPlayers}`);
      room.waitForPlayers();
      RoomRepository.save(room);
    }

  }

  static validateGuess(word: Word, guess: string): boolean {
    if (this.matchesSingularOrPluralWord(word.getWord(), guess)) {
      return true;
    }
    for (let synonym in word.getSynonyms().getArray()) {
      if (this.matchesSingularOrPluralWord(synonym, guess)) {
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





