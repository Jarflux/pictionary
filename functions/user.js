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

exports.update = update;

function addDrawingToHistory(playerSnapshot, wordUid) {
  let amount = 1;
  if (playerSnapshot.child(`/drawings/${wordUid}`).exists()) {
    let amount = playerSnapshot.child(`/drawings/${wordUid}`).val()
  }
  playerSnapshot.child(`/drawings/${wordUid}`).set(amount);
}

function addGuess(playerSnapshot) {
  let amount = 1;
  if (playerSnapshot.child(`/guesses`).exists()) {
    let amount = playerSnapshot.child(`/guesses`).val() + 1;
  }
  playerSnapshot.child(`/guesses`).set(amount);
}

function addCorrectGuess(playerSnapshot) {
  let amount = 1;
  if (playerSnapshot.child(`/correctGuesses`).exists()) {
    let amount = playerSnapshot.child(`/correctGuesses`).val() + 1;
  }
  playerSnapshot.child(`/correctGuesses`).set(amount);
}

function addScore(playerSnapshot, score) {
  let amount = score;
  if (playerSnapshot.child(`/score`).exists()) {
    let amount = playerSnapshot.child(`/score`).val() + score;
  }
  playerSnapshot.child(`/score`).set(amount);
}

