const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);

exports.validate = require('./validate');
exports.user = require('./user');
exports.round = require('./round');
exports.room = require('./room');

// TODO FUNCTIONS
//
// on winner change:
//     - stop round and assign points
//
// on userProfileUpdate:
//     - check if new achievements are earned
//
// on drawing change:
//     - set room timer timestamp
//      - set room gameState to DRAWING
//
// when room timer timestamp + 60s is passed:
//     - stop round and assign penalities
// - add word to artist drawingHistory
//
// when player is afk/closed window:
//     - kick player from room
//
