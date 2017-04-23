const functions = require('firebase-functions');
const admin = require('firebase-admin');

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
            secure: {
              wordUid: randomWordUid
            }
          };
          console.log("room update", roomUpdates);
          return admin.database().ref(`/rooms/${roomUid}`).update(roomUpdates);
        });
    });
}

function stop(roomUid) {
  let roomUpdates = {
    winnerUid: null,
    startRoundTimestamp: 0,
    secure: {
      wordUid: null
    }
  };
  return admin.database().ref(`/rooms/${roomUid}`).update(roomUpdates);
}

function getNextArtistUid(roomObject) {
  let i = 0;
  console.log("players", roomObject.players);
  let playerUids = Object.keys(roomObject.players);
  let rand = Math.floor(Math.random() * playerUids.length);
  let artistUid = playerUids[rand];
  console.log("new artist", artistUid);
  return artistUid;
}

function getRandomWordUid() {
  return admin.database().ref(`/words`).once('value')
    .then(words => {

      // let i = 0;
      // console.log("words", words.val());
      // let wordUids = Object.keys(words.val());
      // let rand = Math.floor(Math.random() * wordUids.length);
      // let randomWordUid = wordUids[rand];
      // console.log("new random word", randomWordUid);
      // return randomWordUid;

      let i = 0;
      let rand = Math.floor(Math.random() * words.numChildren());
      let newWordUid;
      words.forEach(function (word) {
        if (i == rand) {
          console.log("new word", word.key);
          newWordUid = word.key;
        }
        i++;
      });
      return newWordUid;
    });
}

exports.start = start;
exports.stop = stop;

exports.testStart = functions.https.onRequest((request, response) => {
  return start(request.query.room);
});

exports.testStop = functions.https.onRequest((request, response) => {
  return stop(request.query.room);
});





