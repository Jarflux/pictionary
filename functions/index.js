const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.validate = functions.https.onRequest((request, response) => {
  response.send("User", request.query.user, "Guessed", request.query.guess, "in room", request.quesry.room);
});
//exports.emptyRoomCleanup = require('./validate-guess');


