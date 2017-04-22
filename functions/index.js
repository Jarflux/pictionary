const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.emptyRoomCleanup = require('./validate-guess');


