const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.createProfile = functions.auth.user().onCreate(event => {
  console.log('login userdata', event.data);
  let playerUid = event.data.uid;
  let userData = {
    name: event.data.displayName || "",
    secure: {
      guessCount: 0,
      correctGuessCount: 0
    }
  };
  return admin.database()
    .ref(`/playerInfo/${playerUid}`)
    .update(userData);
});

function update(playerUid, guessCountIncrease, correctGuessCountIncrease, scoreIncrease) {
  return admin.database().ref(`/playerInfo/${playerUid}`)
    .once('value')
    .then(snapshot => snapshot.val())
    .then(player => {

      let guessCount = calculateNewValue(player.guessCount, guessCountIncrease);
      let correctGuessCount = calculateNewValue(player.correctGuessCount, correctGuessCountIncrease);
      let score = calculateNewValue(player.score, scoreIncrease);

      let playerUpdates = {
        secure: {
          guessCount: guessCount,
          correctGuessCount: correctGuessCount,
          score: score
        }
      };
      return admin.database().ref(`/playerInfo/${playerUid}`).update(playerUpdates);
    });
}

function calculateNewValue(oldValue, increment) {
  let newValue;
  if (newValue && newValue != null) {
    newValue = newValue + increment;
  } else {
    newValue = increment;
  }
  return newValue;
}

function addDrawingToHistory(playerSnapshot, wordUid) {
  let amount = 1;
  if (playerSnapshot.child(`/drawings/${wordUid}`).exists()) {
    amount = playerSnapshot.child(`/drawings/${wordUid}`).val()
  }
  playerSnapshot.child(`/drawings/${wordUid}`).ref.set(amount);
}

function addGuess(playerSnapshot) {
  let amount = 1;
  if (playerSnapshot.child(`/guessCount`).exists()) {
    amount = playerSnapshot.child(`/guessCount`).val() + 1;
  }
  playerSnapshot.child(`/guessCount`).ref.set(amount);
}

function addCorrectGuess(playerSnapshot) {
  let amount = 1;
  if (playerSnapshot.child(`/correctGuessCount`).exists()) {
    amount = playerSnapshot.child(`/correctGuessCount`).val() + 1;
  }
  playerSnapshot.child(`/correctGuessCount`).ref.set(amount);
}

function addScore(playerSnapshot, score) {
  let amount = score;
  if (playerSnapshot.child(`/score`).exists()) {
    amount = playerSnapshot.child(`/score`).val() + score;
  }
  playerSnapshot.child(`/score`).ref.set(amount);
}

exports.update = update;
exports.addDrawingToHistory = addDrawingToHistory;
exports.addGuess = addGuess;
exports.addCorrectGuess = addCorrectGuess;
exports.addScore = addScore;



