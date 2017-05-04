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

  static processGuess(roomUid: string, playerUid: string, guess: string): boolean {
    RoomRepository.findByUid(roomUid).then(room => {
      WordRepository.findByUid(room.getWordUid()).then(word => {
        let isCorrectGuess = GameService.validateGuess(word, guess);
        PlayerRepository.findByUid(playerUid).then(player=>{
          player.setGuessCount(player.getGuessCount() + 1);
          if(isCorrectGuess){
            player.setCorrectGuessCount(player.getCorrectGuessCount() + 1);
            player.setScore(player.getScore() + 50);
            // TODO update room status
          }else{
            player.setScore(player.getScore() - 10);
          }
          PlayerRepository.save(player);
          return isCorrectGuess;
          // TODO fix return boolean
        });
      });
    });
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

  static validateGuess(word: Word, guess: string): boolean{
    if (guess === "blaaspijp") {
      return true;
    }
    if (word.getWord() === guess) {
     return true;
    }
    return word.getSynonyms().contains(guess);

    // always accept 'blaaspijp' for debug purpose
    // words ending with o als accept 'word' +es
    // words ending with fe als accept 'word' -fe +ves
    // words ending with f als accept 'word' -f +ves
    // words ending with y als accept 'word' -y +ies
    // words not ending with o, fe, f also accept 'word' + s

  }

  static createPlayer(player:Player){
    PlayerRepository.save(player);
  }
}

// TODO migrate following functions

// export let restartRound = (roomSnapshot: firebase.database.DataSnapshot) => {
//   let roomUpdates = {
//     winnerUid: null,
//     startRoundTimestamp: 0,
//     wordUid: null,
//     gameState: "RUNNING",
//   };
//   return roomSnapshot.ref.update(roomUpdates);
// };
//
// export let stopRound = (roomSnapshot: firebase.database.DataSnapshot, winnerUid: string) => {
//   let roomUpdates = {
//     winnerUid: winnerUid,
//     startRoundTimestamp: 0,
//     gameState: "STOPPED",
//   };
//   return roomSnapshot.ref.update(roomUpdates);
// };
//
// export let startRound = (roomSnapshot: firebase.database.DataSnapshot) => {
//   return getRandomWordUid().then(randomWordUid => {
//     let roomUpdates = {
//       winnerUid: null,
//       artistUid: getNextArtistUid(roomSnapshot),
//       startRoundTimestamp: Math.floor(Date.now()),
//       wordUid: randomWordUid,
//       gameState: "RUNNING",
//     };
//     return roomSnapshot.ref.update(roomUpdates);
//   });
// };
//
// export let setStatusToWaitForPlayers = async (roomSnapshot: firebase.database.DataSnapshot) => {
//   let roomUpdates = {
//     winnerUid: null,
//     startRoundTimestamp: 0,
//     wordUid: null,
//     gameState: "WAITING",
//   };
//   return roomSnapshot.ref.update(roomUpdates);
// };
//
//
// let getRandomWordUid = () => {
//   return firebaseAdmin.database().ref(`/words`).once('value')
//     .then(words => {
//       let wordUids = Object.keys(words.val());
//       let rand = Math.floor(Math.random() * wordUids.length);
//       let randomWordUid = wordUids[rand];
//       return randomWordUid;
//     });
// };




