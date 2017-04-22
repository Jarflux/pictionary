const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.validate = functions.https.onRequest((request, response) => {
  response.send("User",request.query.user,"Guessed", request.query.guess,"in room",request.quesry.room);
});
