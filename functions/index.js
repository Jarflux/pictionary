const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);

exports.validate = functions.https.onRequest((request, response) => {
  //firebase.database().ref('room/')
  response.send("User " + request.query.user + " Guessed " + request.query.guess + " in room " + request.query.room);
});
//exports.emptyRoomCleanup = require('./validate-guess');


