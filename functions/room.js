const functions = require('firebase-functions');
const admin = require('firebase-admin');
const round = require('./round');

exports.management = functions.database.ref('/rooms/{roomUid}/players').onWrite(event => {
  let roomUid = event.params.roomUid;
  getNumberOfPlayersInRoom(roomUid).then(numberOfPlayers => {
    if (numberOfPlayers === 0) {
      console.log(`Room management notice: closed room ${roomUid}, because room is empty`);
      return remove(roomUid); // cleanup empty rooms
    } else {
      round.isInProgress(roomUid).then(roomInProgress => {
        console.log(`Room management notice: round is in progress ${roomInProgress}`);
        if (roomInProgress) {
          if (numberOfPlayers > 2) {
            return artistIsInRoom(roomUid).then(artistIsInRoom => {
              if (!artistIsInRoom) {
                console.log(`Room management notice: round restarted in room ${roomUid} because artist left and round is in progress`);
                return round.restart(roomUid);
              }
            });
          } else {
            console.log(`Room management notice: waiting for players in room ${roomUid}, player count ${numberOfPlayers}`);
            return round.wait(roomUid);
          }
        } else {
          if (numberOfPlayers > 2) {
            console.log(`Room management notice: round started in room ${roomUid} because enough players and no round is in progress`);
            return round.start(roomUid);
          }
        }
      })
    }
  });
});

function getNumberOfPlayersInRoom(roomUid) {
  return admin.database().ref(`/rooms/${roomUid}/players`).once('value')
    .then(snapshot => snapshot.val())
    .then(players => {
        if (players) {
          let playersUids = Object.keys(players);
          return playersUids.length;
        } else {
          return 0;
        }
      }
    );
}

function artistIsInRoom(roomUid) {
  return admin.database().ref(`/rooms/${roomUid}/players`).once('value')
    .then(snapshot => snapshot.val())
    .then(players => {
      return getArtistUid(roomUid).then(artistUid => {
        let playersUids = Object.keys(players);
        return playersUids.includes(artistUid);
      });
    });
}

function getArtistUid(roomUid) {
  return admin.database().ref(`/rooms/${roomUid}`).once('value')
    .then(snapshot => snapshot.val())
    .then(roomObject => {
      return roomObject.artistUid
    });
}

function remove(roomUid) {
  return admin.database().ref(`/rooms/${roomUid}`).remove();
}
