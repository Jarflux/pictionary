import * as firebaseFunctions from 'firebase-functions';
import * as firebase from 'firebase/app'
import * as firebaseAdmin from 'firebase-admin';
import * as User from './user';
import * as Room from './room';
import * as Round from './round';
import * as Cors from 'cors';

export let guessHttpEndpoint = firebaseFunctions.https.onRequest(async (request, response) => {
  let roomUid = request.query.roomUid;
  let playerUid = request.query.playerUid;
  let guess = request.query.guess;


  console.log(`Recieved guess: ${guess} ${roomUid} ${playerUid}`);

  const cors = Cors({origin: true});
  cors(request, response, () => {
    return firebaseAdmin.database().ref(`/rooms/${roomUid}`).once('value')
      .then(async roomSnapshot => {
        if (Room.isInProgress(roomSnapshot)) {
          let isCorrectAnswerResult = await isCorrectAnswer(roomSnapshot.child(`wordUid`).val(), guess);
          await updateUser(playerUid, isCorrectAnswerResult);
          await updateRoom(roomSnapshot, isCorrectAnswerResult, playerUid);
          response.status(isCorrectAnswerResult ? 200 : 204).send();
        }
      });
  });
});


let updateRoom = async (roomSnapshot: firebase.database.DataSnapshot, isCorrectAnswer: boolean, playerUid: string) => {
  return new Promise((resolve, reject) => {
    if (isCorrectAnswer) {
      Round.stopRound(roomSnapshot, playerUid).then(resolve, reject);
    } else {
      resolve();
    }
  });
};

let updateUser = async (playerUid, isCorrectAnswer) => {
  return firebaseAdmin.database()
    .ref(`/playerInfo/${playerUid}/secure`)
    .once('value')
    .then(playerSnapshot => {
      User.addGuess(playerSnapshot);
      if (isCorrectAnswer) {
        User.addCorrectGuess(playerSnapshot);
        User.addScore(playerSnapshot, 50);
      } else {
        User.addScore(playerSnapshot, -10);
      }
    });
};

let isCorrectAnswer = async (wordUid, guess) => {
  return firebaseAdmin.database()
    .ref(`/words/${wordUid}`)
    .once('value')
    .then(snapshot => {
      let wordSnapshot: firebase.database.DataSnapshot = snapshot as firebase.database.DataSnapshot;

      //Debug guess word
      if (guess === "blaaspijp") {
        return true;
      }

      let isCorrect = false;
      if (wordSnapshot.child(`word`).exists() && wordSnapshot.child(`word`).val() === guess) {
        isCorrect = true;
      } else if (wordSnapshot.child(`synonyms`).exists()) {
        wordSnapshot.forEach((synonym) => {
          if (synonym.val() === guess) {
            isCorrect = true;
            return true;
          }
        });
      }
      return isCorrect;
    });

  // always accept 'blaaspijp' for debug purpose
  // words ending with o als accept 'word' +es
  // words ending with fe als accept 'word' -fe +ves
  // words ending with f als accept 'word' -f +ves
  // words ending with y als accept 'word' -y +ies
  // words not ending with o, fe, f also accept 'word' + s
};

