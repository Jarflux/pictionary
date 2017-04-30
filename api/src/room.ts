import * as firebaseFunctions from 'firebase-functions';
import * as firebase from 'firebase/app'
import * as firebaseAdmin from 'firebase-admin';

export let management = () => {
  let roomPlayersRef = firebaseFunctions.database.ref('/rooms/{roomUid}/players');

  roomPlayersRef.onWrite(async event => {

    let roomsRef = getParentReference(event.data.ref);
    let roomUid: string = event.params['roomUid'];

    let roomSnapshot: firebase.database.DataSnapshot = await roomsRef.once('value');
    let numberOfPlayers = hasPlayersInARoom(roomSnapshot);
    let roomIsInProgress = isInProgress(roomSnapshot);

    if (numberOfPlayers > 2) {
      if (roomIsInProgress) {
        let artistIsInRoom = isArtistInPlayers(roomSnapshot);
        if (!artistIsInRoom) {
          console.log(`Room management notice: round restarted in room ${roomUid} because artist left and round is in progress`);
          return restartRound(roomSnapshot);
        }
      } else {
        console.log(`Room management notice: round started in room ${roomUid} because enough players and no round is in progress`);
        return startRound(roomSnapshot);
      }
    } else if (numberOfPlayers === 0) {
      console.log(`Room management notice: remove room ${roomUid}, player count ${numberOfPlayers}`);
      roomSnapshot.ref.remove();
    } else if (roomIsInProgress){
      console.log(`Room management notice: waiting for players in room ${roomUid}, player count ${numberOfPlayers}`);
      return setStatusToWaitForPlayers(roomSnapshot);
    }
  });
};

export let restartRound = async (roomSnapshot: firebase.database.DataSnapshot) => {
  let roomUpdates = {
    winnerUid: null,
    startRoundTimestamp: 0,
    wordUid: null,
    gameState: "RUNNING",
  };
  return roomSnapshot.ref.update(roomUpdates);
};

export let stopRound = async (roomSnapshot: firebase.database.DataSnapshot, winnerUid: string) => {
  let roomUpdates = {
    winnerUid: winnerUid,
    startRoundTimestamp: 0,
    gameState: "STOPPED",
  };
  return roomSnapshot.ref.update(roomUpdates);
};

export let startRound = async (roomSnapshot: firebase.database.DataSnapshot) => {
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

let getParentReference = (firebaseReference: firebase.database.Reference): firebase.database.Reference => {
  return firebaseReference.parent;
};

let isInProgress = (roomSnapshot: firebase.database.DataSnapshot) => {
  return roomSnapshot.child('gameState').val() === "RUNNING";
};

let hasPlayersInARoom = (roomSnapshot: firebase.database.DataSnapshot): number => {
  if (roomSnapshot.hasChild('players')) {
    return roomSnapshot.child('players').numChildren();
  } else {
    return 0;
  }
};

let isArtistInPlayers = async (roomSnapshot: firebase.database.DataSnapshot) => {
  if (roomSnapshot.child('artistUid').exists()) {
    let artistUid = roomSnapshot.child('artistUid').val();
    return roomSnapshot.child(`players/${artistUid}`).exists();
  }
  return false;
};

let getNextArtistUid = (roomSnapshot: firebase.database.DataSnapshot) => {
  let currentArtistUid: string = roomSnapshot.child(`artistUid`).val();
  let nextPossibleArtist: string = undefined;

  if (roomSnapshot.hasChild('players')) {
    roomSnapshot.child('players').forEach(playerSnaphot => {
      if(nextPossibleArtist === currentArtistUid) {
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
