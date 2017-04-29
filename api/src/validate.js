const functions = require('firebase-functions');
const admin = require('firebase-admin');
const user = require('./user');
const room = require('./room');
const cors = require('cors')({origin: true});

exports.guessHttp = functions.https.onRequest((request, response) => {
  let roomUid = request.query.roomUid;
  let playerUid = request.query.playerUid;
  let guess = request.query.guess;

  console.log(`Recieved guess: ${guess} ${roomUid} ${playerUid}`);

  cors(request, response, () => {
    return admin.database().ref(`/rooms/${roomUid}`).once('value')
      .then(snapshot => {
        let roomSnapshot = snapshot;
        if (room.roundInProgress(roomSnapshot)) {
          return isCorrectAnswer(snapshot.child(`wordUid`).val(), guess)
            .then((isCorrectAnswer) => {
              updateRoom(roomSnapshot, isCorrectAnswer, playerUid);
              return updateUser(playerUid, isCorrectAnswer).then(() => {
                if (isCorrectAnswer) {
                  response.status(200).send();
                } else {
                  response.status(204).send();
                }
              });
            });
        }
      });
  });
});

function updateRoom(roomSnapshot, isCorrectAnswer, playerUid) {
  if (isCorrectAnswer) {
    room.stopRound(roomSnapshot, playerUid);
  }
}

function updateUser(playerUid, isCorrectAnswer) {
  return admin.database()
    .ref(`/playerInfo/${playerUid}/secure`)
    .once('value')
    .then(playerSnapshot => {
      user.addGuess(playerSnapshot);
      if (isCorrectAnswer) {
        user.addCorrectGuess(playerSnapshot);
        user.addScore(playerSnapshot, 50);
      } else {
        user.addScore(playerSnapshot, -10);
      }
    });
}

function isCorrectAnswer(wordUid, guess) {
  return admin.database()
    .ref(`/words/${wordUid}`)
    .once('value')
    .then(wordSnapshot => {
      let isCorrect = false;
      if (guess === "blaaspijp") {
        return true;
      }
      if (wordSnapshot.child(`word`).exists()
        && wordSnapshot.child(`word`).val() === guess) {
        return true;
      } else {
        if (wordSnapshot.child(`synonyms`).exists()) {
          wordSnapshot.forEach(function (synonym) {
            if (synonym.val() === guess) {
              isCorrect = true;
            }
          });
          return isCorrect;
        }
      }
      return isCorrect;
    });

  // always accept 'blaaspijp' for debug purpose
  // words ending with o als accept 'word' +es
  // words ending with fe als accept 'word' -fe +ves
  // words ending with f als accept 'word' -f +ves
  // words ending with y als accept 'word' -y +ies
  // words not ending with o, fe, f also accept 'word' + s
}



