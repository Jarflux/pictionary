const functions = require('firebase-functions');
const admin = require('firebase-admin');
const round = require('./round');

exports.management = functions.database.ref('/rooms/{roomUid}/players').onWrite(event => {
  let roomUid = event.params.roomUid;

  return admin.database().ref(`/rooms/${roomUid}`).once('value')
    .then(roomSnapshot => {
      let numberOfPlayers = countPlayers(roomSnapshot);
      if (numberOfPlayers == 0) {
        console.log(`Room management notice: remove room ${roomUid}, player count ${numberOfPlayers}`);
        roomSnapshot.ref.remove();
      } else {
        if (isInProgress(roomSnapshot)) {
          if (numberOfPlayers > 2) {
            let artistIsInRoom = isArtistInPlayers(roomSnapshot);
            if (!artistIsInRoom) {
              console.log(`Room management notice: round restarted in room ${roomUid} because artist left and round is in progress`);
              return restartRound(roomSnapshot);
            }
          } else {
            console.log(`Room management notice: waiting for players in room ${roomUid}, player count ${numberOfPlayers}`);
            return setStatusToWaitForPlayers(roomSnapshot);
          }
        } else {
          if (numberOfPlayers > 2) {
            console.log(`Room management notice: round started in room ${roomUid} because enough players and no round is in progress`);
            return startRound(roomSnapshot);
          }
        }
      }
    });
});

function isInProgress(roomSnapshot) {
  return roomSnapshot.child('gameState').val() === "RUNNING";
}

function countPlayers(roomSnapshot) {
  if(roomSnapshot.hasChild('players')){
    return roomSnapshot.child('players').numChildren();
  } else {
    return 0;
  }
}

function restartRound(roomSnapshot) {
  let roomUpdates = {
    winnerUid: null,
    startRoundTimestamp: 0,
    wordUid: null,
    gameState: "RUNNING",
  };
  return roomSnapshot.ref.update(roomUpdates);
}

function stopRound(roomSnapshot) {
  let roomUpdates = {
    winnerUid: null,
    startRoundTimestamp: 0,
    wordUid: null,
    gameState: "STOPPED",
  };
  return roomSnapshot.ref.update(roomUpdates);
}

function startRound(roomSnapshot) {
  let roomUpdates = {
    winnerUid: null,
    startRoundTimestamp: 0,
    wordUid: null,
    gameState: "RUNNING",
  };
  return roomSnapshot.ref.update(roomUpdates);
}

function setStatusToWaitForPlayers(roomSnapshot) {
  let roomUpdates = {
    winnerUid: null,
    startRoundTimestamp: 0,
    wordUid: null,
    gameState: "WAITING",
  };
  return roomSnapshot.ref.update(roomUpdates);
}

function isArtistInPlayers(roomSnapshot) {
  if(roomSnapshot.child('artistUid').exists()){
    let artistUid = roomSnapshot.child('artistUid').val();
    return roomSnapshot.child(`players/${artistUid}`).exists();
  }
  return false;
}

function getArtistUid(roomSnapshot) {
  return roomSnapshot.child('artistUid').val();
}
