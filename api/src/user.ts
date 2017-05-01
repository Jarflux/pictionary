import * as firebaseFunctions from 'firebase-functions';
import * as firebase from 'firebase/app'
import * as firebaseAdmin from 'firebase-admin';

export let createPlayerInfoOnRegister = firebaseFunctions.auth.user().onCreate(async event => {
  console.log('login userdata', event.data);
  let playerUid = event.data['uid'] as string;
  let updatedUserData = {
    name: event.data['displayName'] || '',
    secure: {
      guessCount: 0,
      correctGuessCount: 0
    }
  };

  return firebaseAdmin.database()
    .ref(`/playerInfo/${playerUid}`)
    .update(updatedUserData);
});

export let updateUserInfo = (playerUid: string, guessCountIncrease: number, correctGuessCountIncrease: number, scoreIncrease: number) => {
  let playerInfoRef = firebaseAdmin.database().ref(`/playerInfo/${playerUid}`);


  return playerInfoRef.once('value')
    .then(snapshot => snapshot.val())
    .then(player => {
      let guessCount = calculateIncrementedValue(guessCountIncrease, player.guessCount);
      let correctGuessCount = calculateIncrementedValue(correctGuessCountIncrease, player.correctGuessCount);
      let score = calculateIncrementedValue(scoreIncrease, player.score);

      let playerUpdates = {
        secure: {
          guessCount: guessCount,
          correctGuessCount: correctGuessCount,
          score: score
        }
      };

      return playerInfoRef.update(playerUpdates);
    });
};

export let addDrawingToHistory = (playerSnapshot: firebase.database.DataSnapshot, wordUid: string) => {
  let drawingWordSnapshot = playerSnapshot.child(`/drawings/${wordUid}`);
  incrementFieldValueWithOne(drawingWordSnapshot);
};

export let addGuess = (playerSnapshot: firebase.database.DataSnapshot) => {
  let drawingWordSnapshot = playerSnapshot.child(`/guessCount`);
  incrementFieldValueWithOne(drawingWordSnapshot);
};

export let addCorrectGuess = (playerSnapshot: firebase.database.DataSnapshot) => {
  let drawingWordSnapshot = playerSnapshot.child(`/correctGuessCount`);
  incrementFieldValueWithOne(drawingWordSnapshot);
};

export let addScore = (playerSnapshot: firebase.database.DataSnapshot, score: number) => {
  incrementFieldValue(playerSnapshot.child(`/score`), score);
};

let calculateIncrementedValue = (increment: number, baseValue: null | number) => {
  return (baseValue || 0) + increment;
};

let incrementFieldValueWithOne = (snapshotField: firebase.database.DataSnapshot) => {
  incrementFieldValue(snapshotField, 1);
};


let incrementFieldValue = (snapshotField: firebase.database.DataSnapshot, incrementValue: number) => {
  let amount = incrementValue;
  if (snapshotField.exists()) {
    amount += snapshotField.val();
  }

  snapshotField.ref.set(amount);
};

