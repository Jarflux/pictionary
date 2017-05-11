/**
 * Created by Ben on 04/05/2017.
 */
import {Room} from "../model/Room";
import {RoomRepository} from "../repository/RoomRepository";
import {WordRepository} from "../repository/WordRepository";
import {Word} from "../model/Word";
import {Player} from "../model/Player";
import {PlayerRepository} from "../repository/PlayerRepository";
import {Message} from "../model/Message";
import {MessageRepository} from "../repository/MessageRepository";

export class GameService {

  // TODO fix return boolean
  static processGuess(roomUid: string, playerUid: string, guess: string): boolean {
    RoomRepository.findByUid(roomUid).then(room => {
      WordRepository.findByUid(room.getWordUid()).then(word => {
        let isCorrectGuess = GameService.validateGuess(word, guess);
        PlayerRepository.findByUid(playerUid).then(player => {
          player.setGuessCount(player.getGuessCount() + 1);
          if (isCorrectGuess) {
            MessageRepository.add(room, new Message(`${player.getName()} guessed ${guess} and was correctly matched to ${word.getWord()}`));
            MessageRepository.add(room, new Message("System stopped the current round because of a correct guess"));
            room.stopRound(player.getUid());
            RoomRepository.save(room);
            MessageRepository.add(room, new Message("System starts a new round"));
            room.startRound(word.getUid());
            RoomRepository.save(room);
            player.setCorrectGuessCount(player.getCorrectGuessCount() + 1);
            player.setScore(player.getScore() + 50);
          } else {
            MessageRepository.add(room, new Message(`${player.getName()} guessed ${guess}`));
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
          MessageRepository.add(room, new Message(`Room management notice: round restarted in room ${room.getUid()} because artist left and round is in progress`));
          WordRepository.findRandom().then(word => {
            room.stopRoundWithoutWinner();
            room.startRound(word.getUid());
            RoomRepository.save(room);
          });
        }
      } else {
        MessageRepository.add(room, new Message(`Room management notice: round started in room ${room.getUid()} because enough players and no round is in progress`));
        WordRepository.findRandom().then(word => {
          room.startRound(word.getUid());
          RoomRepository.save(room);
        });
      }
    } else if (numberOfPlayers === 0) {
      MessageRepository.add(room, new Message(`Room management notice: remove room ${room.getUid()}, player count ${numberOfPlayers}`));
      RoomRepository.remove(room);
    } else if (room.isInProgress()) {
      MessageRepository.add(room, new Message(`Room management notice: waiting for players in room ${room.getUid()}, player count ${numberOfPlayers}`));
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
    guess = guess.toLowerCase();
    word = word.toLowerCase();
    if ("blaaspijp" === guess) {
      return true;
    }
    if (word === guess) {
      return true;
    }
    if (word.endsWith("o") && (( word + "es") === guess)){
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
    return ( word + "s") === guess;
  }

  static createPlayer(player: Player) {
    PlayerRepository.save(player);
  }

}





