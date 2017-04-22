const functions = require('firebase-functions');

exports.guess = functions.https.onRequest((request, response) => {
  //firebase.database().ref('room/')
  response.send("User " + request.query.user + " Guessed " + request.query.guess + " in room " + request.query.room);
});
