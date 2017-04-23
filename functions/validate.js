const functions = require('firebase-functions');
const admin = require('firebase-admin');
const user = require('./user');

exports.guess = functions.database.ref('/words/{roomUid}/guesses/{playerUid}').onWrite(event => {
  const guess = event.data.val();
  console.log('Retrieved guess: ', guess);

  const roomUid = event.params.roomUid;
  const playerUid = event.params.playerUid;

  return admin.database().ref(`/rooms/${roomUid}`).once('value')
    .then(snapshot => snapshot.val())
    .then(value => {
      return isCorrectAnswer(value.wordUid, guess);
    }).then((isCorrectAnswer) => {
      return updateRoom(roomUid, isCorrectAnswer, playerUid)
        .then(() => {
          return updateUser(playerUid, isCorrectAnswer)
        });
    });
});

function updateRoom(roomUid, isCorrectAnswer, playerUid) {
  if (isCorrectAnswer) {
    let roomUpdates = {
      winnerUid: playerUid,
      gameState: "STOPPED"
    };
    return admin.database().ref(`/rooms/${roomUid}`).update(roomUpdates)
      .then(() => {
        return Promise.resolve(true);
      });
  }
  return Promise.resolve(false);
}

function updateUser(playerUid, isCorrectAnswer) {
  return admin.database()
    .ref(`/playerInfo/${playerUid}/secure`)
    .once('value')
    .then(snapshot => snapshot.val())
    .then(userObject => {
      let score = 50;
      let guessCountIncrease = 1;
      let correctGuessCountIncrease = 0;
      if (isCorrectAnswer) {
        correctGuessCountIncrease = correctGuessCountIncrease + 1;
      }
      return user.update(playerUid, guessCountIncrease, correctGuessCountIncrease, score);
    });
}

function isCorrectAnswer(wordUid, guess) {

  function matchWord(wordObject, guess) {
    let isCorrect = false;

    if (guess === "blaaspijp" || guess === wordObject.word) {
      isCorrect = true;
    } else {
      for (let key of Object.keys(wordObject.synonyms)) {
        if (wordObject.synonyms[key] === guess) {
          isCorrect = true;
          break;
        }
      }
    }
    return isCorrect;
  }

  return admin.database()
    .ref(`/words/${wordUid}`)
    .once('value')
    .then(snapshot => snapshot.val())
    .then(wordObject => {
      return matchWord(wordObject, guess);
    });

  // always accept 'blaaspijp' for debug purpose
  // words ending with o als accept 'word' +es
  // words ending with fe als accept 'word' -fe +ves
  // words ending with f als accept 'word' -f +ves
  // words ending with y als accept 'word' -y +ies
  // words not ending with o, fe, f also accept 'word' + s
}




