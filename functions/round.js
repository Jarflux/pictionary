// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
//
// exports.start = function start(){
//
//
// }
//
//
//
//
//   functions.database.ref('/rooms/{roomUid}/players').onWrite(event => {
//   const guess = event.data.val();
//   console.log('Retrieved guess: ', guess);
//
//   const roomUid = event.params.roomUid;
//   const playerUid = event.params.playerUid;
//
//   return admin.database().ref(`/rooms/${roomUid}`).once('value')
//     .then(snapshot => snapshot.val())
//     .then(value => {
//       return isCorrectAnswer(value.secure.word, guess);
//     }).then((isCorrectAnswer) => {
//       return updateRoom(roomUid, isCorrectAnswer, playerUid)
//         .then(() => {
//           return updateUser(playerUid, isCorrectAnswer)
//         });
//     });
// });
//
// function updateRoom(roomUid, isCorrectAnswer, playerUid) {
//   if (isCorrectAnswer) {
//     let roomUpdates = {
//       winner: playerUid,
//       finished: true
//     };
//     return admin.database().ref(`/rooms/${roomUid}/secure`).update(roomUpdates)
//       .then(() => {
//         return Promise.resolve(true);
//       });
//   }
//   return Promise.resolve(false);
// }
//
// function updateUser(playerUid, isCorrectAnswer) {
//   return admin.database()
//     .ref(`/playerInfo/${playerUid}/secure`)
//     .once('value')
//     .then(snapshot => snapshot.val())
//     .then(userObject => {
//
//       let userUpdates = {
//         guessCount: userObject.guessCount + 1
//       };
//
//       if (isCorrectAnswer) {
//         userUpdates.correctGuessCount = userObject.correctGuessCount + 1;
//       }
//
//       return admin.database()
//         .ref(`/playerInfo/${playerUid}/secure`)
//         .update(userUpdates);
//     });
// }
//
//



