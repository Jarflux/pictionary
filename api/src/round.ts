import * as firebase from 'firebase/app'
import * as firebaseAdmin from 'firebase-admin';

export let restartRound = (roomSnapshot: firebase.database.DataSnapshot) => {
  let roomUpdates = {
    winnerUid: null,
    startRoundTimestamp: 0,
    wordUid: null,
    gameState: "RUNNING",
  };
  return roomSnapshot.ref.update(roomUpdates);
};

export let stopRound = (roomSnapshot: firebase.database.DataSnapshot, winnerUid: string) => {
  let roomUpdates = {
    winnerUid: winnerUid,
    startRoundTimestamp: 0,
    gameState: "STOPPED",
  };
  return roomSnapshot.ref.update(roomUpdates);
};

export let startRound = (roomSnapshot: firebase.database.DataSnapshot) => {
  return getRandomWordUid().then(randomWordUid => {
    let roomUpdates = {
      winnerUid: null,
      artistUid: getNextArtistUid(roomSnapshot),
      startRoundTimestamp: Math.floor(Date.now()),
      wordUid: randomWordUid,
      gameState: "RUNNING",
    };
    return roomSnapshot.ref.update(roomUpdates);
  });
};

export let roundInProgress = (roomSnapshot) => {
  return roomSnapshot.child('gameState').exists() && roomSnapshot.child('gameState').val() == "RUNNING";
};

export let setStatusToWaitForPlayers = async (roomSnapshot: firebase.database.DataSnapshot) => {
  let roomUpdates = {
    winnerUid: null,
    startRoundTimestamp: 0,
    wordUid: null,
    gameState: "WAITING",
  };
  return roomSnapshot.ref.update(roomUpdates);
};

let getNextArtistUid = (roomSnapshot: firebase.database.DataSnapshot) => {
  let currentArtistUid: string = roomSnapshot.child(`artistUid`).val();
  let nextPossibleArtist: string = undefined;

  if (roomSnapshot.hasChild('players')) {
    roomSnapshot.child('players').forEach(playerSnaphot => {
      if (nextPossibleArtist === currentArtistUid) {
        nextPossibleArtist = playerSnaphot.val();
        return true;
      } else {
        nextPossibleArtist = playerSnaphot.val();
      }
    });
  }

  return nextPossibleArtist;
};


let getRandomWordUid = () => {
  return firebaseAdmin.database().ref(`/words`).once('value')
    .then(words => {
      let wordUids = Object.keys(words.val());
      let rand = Math.floor(Math.random() * wordUids.length);
      let randomWordUid = wordUids[rand];
      return randomWordUid;
    });
};
