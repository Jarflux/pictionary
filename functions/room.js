const functions = require('firebase-functions');
const admin = require('firebase-admin');
const round = require('./round');

exports.management = functions.database.ref('/rooms/{roomUid}/players').onWrite(event => {
  let roomUid = event.params.roomUid;

  return admin.database().ref(`/rooms/${roomUid}`).once('value')
    .then(roomRef => roomRef.val())
    .then(room => {
      let numberOfPlayers = countPlayers(room.players);
      if (numberOfPlayers == 0) {
        console.log(`Room management notice: remove room ${roomUid}, player count ${numberOfPlayers}`);
        roomRef.remove();
      } else {
        if (isInProgress(room)) {
          if (numberOfPlayers > 2) {
            let artistIsInRoom = ArtistIsInRoom(roomRef);
            if (!artistIsInRoom) {
              console.log(`Room management notice: round restarted in room ${roomUid} because artist left and round is in progress`);
              restartRound(roomRef);
            }
          } else {
            console.log(`Room management notice: waiting for players in room ${roomUid}, player count ${numberOfPlayers}`);
            setStatusToWaitForPlayers(roomRef);
          }
        } else {
          if (numberOfPlayers > 2) {
            console.log(`Room management notice: round started in room ${roomUid} because enough players and no round is in progress`);
            startRound(roomRef);
          }
        }
      }
    });
});

function isInProgress(roomObject) {
  return roomObject.gameState === "RUNNING";
}

function countPlayers(playersObject) {
  if (playersObject) {
    let playersUids = Object.keys(playersObject);
    return playersUids.length;
  } else {
    return 0;
  }
}

function restartRound(roomRef) {
  let roomUpdates = {
    winnerUid: null,
    startRoundTimestamp: 0,
    wordUid: null,
    gameState: "RUNNING",
  };
  roomRef.update(roomUpdates);
}

function stopRound(roomRef) {
  let roomUpdates = {
    winnerUid: null,
    startRoundTimestamp: 0,
    wordUid: null,
    gameState: "STOPPED",
  };
  roomRef.update(roomUpdates);
}

function startRound(roomRef) {
  let roomUpdates = {
    winnerUid: null,
    startRoundTimestamp: 0,
    wordUid: null,
    gameState: "RUNNING",
  };
  roomRef.update(roomUpdates);
}


function setStatusToWaitForPlayers(roomRef) {
  let roomUpdates = {
    winnerUid: null,
    startRoundTimestamp: 0,
    wordUid: null,
    gameState: "WAITING",
  };
  roomRef.update(roomUpdates);
}

function artistIsInRoom(roomRef) {
  let artistUid = getArtistUid(roomRef);
  return roomRef.child(`players/${artistUid}`).exists();
}

function getArtistUid(roomRef) {
  return roomRef.child('artistUid').val();
}
