const functions = require('firebase-functions');
const admin = require('firebase-admin');

function stop(roomUid) {
  let roomUpdates = {
    winnerUid: null,
    startRoundTimestamp: 0,
    wordUid: null,
    gameState: "STOPPED",
  };
  return admin.database().ref(`/rooms/${roomUid}`).update(roomUpdates);
}

function wait(roomUid) {
  let roomUpdates = {
    winnerUid: null,
    startRoundTimestamp: 0,
    wordUid: null,
    gameState: "WAITING",
  };
  return admin.database().ref(`/rooms/${roomUid}`).update(roomUpdates);
}


function restart(roomUid) {
  return stop(roomUid)
    .then(() => {start(roomUid)});
}

function isInProgress(roomUid) {
  return admin.database().ref(`/rooms/${roomUid}`).once('value')
    .then(snapshot => snapshot.val())
    .then(roomObject => {
      return roomObject.gameState === "RUNNING";
    });
}

function start(roomUid) {
  return admin.database().ref(`/rooms/${roomUid}`).once('value')
    .then(snapshot => snapshot.val())
    .then(roomObject => {
      return getRandomWordUid()
        .then(randomWordUid => {
          let nextArtistUid = getNextArtistUid(roomObject);
          let roomUpdates = {
            winnerUid: null,
            startRoundTimestamp: Math.floor(Date.now()),
            artistUid: nextArtistUid,
            wordUid: randomWordUid,
            currentGameDrawing: null,
            gameState: "RUNNING"
          };
          console.log("room update", roomUpdates);
          return admin.database().ref(`/rooms/${roomUid}`).update(roomUpdates);
        });
    });
}

function getNextArtistUid(roomObject) {
  let playerUids = Object.keys(roomObject.players);
  let rand = Math.floor(Math.random() * playerUids.length);
  let artistUid = playerUids[rand];
  return artistUid;
}

function getRandomWordUid() {
  return admin.database().ref(`/words`).once('value')
    .then(words => {
      let wordUids = Object.keys(words.val());
      let rand = Math.floor(Math.random() * wordUids.length);
      let randomWordUid = wordUids[rand];
      return randomWordUid;
    });
}

exports.start = start;
exports.stop = stop;
exports.wait = wait;
exports.restart = restart;
exports.isInProgress = isInProgress;

exports.startTest = functions.https.onRequest((request, response) => {
  start(request.query.room).then(() => {response.status(200).send()});
});

exports.stopTest = functions.https.onRequest((request, response) => {
  stop(request.query.room).then(() => {response.status(200).send()});
});

exports.restartTest = functions.https.onRequest((request, response) => {
  restart(request.query.room).then(() => {response.status(200).send()});
});





