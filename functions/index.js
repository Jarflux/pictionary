const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);

exports.validate = require('./validate');
exports.round = require('./round');

// TODO FUNCTIONS
// on lastGuess change:
//     - if guess is correct set winner in room
//
// on players in room change:
//     - remove room if empty
// - stop round if players < 1
// - start round if players > 2
// - start new round if artist left
//
// on winner change:
//     - stop round and assign points
//
// on userProfileUpdate:
//     - check if new achievements are earned
//
// on drawing change:
//     - set room timer timestamp
//
// when room timer timestamp + 60s is passed:
//     - stop round and assign penalities
// - add word to artist drawingHistory
//
// when player is afk/closed window:
//     - kick player from room
//
// on new user create profile with UID
//
//     exports.userCreated = functions.auth.user().onCreate(event => {
//         // ... create the user profile with some UID
//     });
