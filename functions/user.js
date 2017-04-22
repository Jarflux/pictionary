const functions = require('firebase-functions');
const admin = require('firebase-admin');


exports.createProfile = functions.auth.user().onCreate(event => {
    console.log('login userdata', event.data);
    let userId = event.data.uid;
    let userData = {
        name: event.data.displayName || "",
        secure: {
            guessCount: 0,
            correctGuessCount: 0
        }
    };
    return admin.database()
        .ref(`/playerInfo/${userId}`)
        .update(userData);
});