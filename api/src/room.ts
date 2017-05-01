import * as firebaseFunctions from 'firebase-functions';
import * as firebase from 'firebase/app'
import * as Round from './round'

export let management = firebaseFunctions.database.ref('/rooms/{roomUid}/players').onWrite(async event => {

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
        return Round.restartRound(roomSnapshot);
      }
    } else {
      console.log(`Room management notice: round started in room ${roomUid} because enough players and no round is in progress`);
      return Round.startRound(roomSnapshot);
    }
  } else if (numberOfPlayers === 0) {
    console.log(`Room management notice: remove room ${roomUid}, player count ${numberOfPlayers}`);
    roomSnapshot.ref.remove();
  } else if (roomIsInProgress) {
    console.log(`Room management notice: waiting for players in room ${roomUid}, player count ${numberOfPlayers}`);
    return Round.setStatusToWaitForPlayers(roomSnapshot);
  }
});

export let isInProgress = (roomSnapshot: firebase.database.DataSnapshot) => {
  return roomSnapshot.child('gameState').val() === "RUNNING";
};


let isArtistInPlayers = async (roomSnapshot: firebase.database.DataSnapshot) => {
  if (roomSnapshot.child('artistUid').exists()) {
    let artistUid = roomSnapshot.child('artistUid').val();
    return roomSnapshot.child(`players/${artistUid}`).exists();
  }
  return false;
};


let getParentReference = (firebaseReference: firebase.database.Reference): firebase.database.Reference => {
  return firebaseReference.parent;
};

let hasPlayersInARoom = (roomSnapshot: firebase.database.DataSnapshot): number => {
  if (roomSnapshot.hasChild('players')) {
    return roomSnapshot.child('players').numChildren();
  } else {
    return 0;
  }
};

