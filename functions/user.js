const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.createProfile = functions.auth.user().onCreate(event => {
  console.log('login userdata', event.data);
  let userId = event.data.uid;
  let userData = {
    name: event.data.displayName || "",
    secure: {
      guessCount: 0,
      correctGuessCount: 0
    }
  };
  return admin.database()
    .ref(`/playerInfo/${userId}`)
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
      return admin.database().ref(`/playerInfo/${userId}`).update(playerUpdates);
    });
}

function calculateNewValue(oldValue, increment){
  let newValue;
  if(newValue && newValue!=null){
    newValue = newValue + increment;
  }else{
    newValue = increment;
  }
  return newValue;
}

exports.update = update;
