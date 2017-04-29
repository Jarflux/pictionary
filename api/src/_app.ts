const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);


import * as room from './room.js'
import * as validate from './validate.js'
import * as user from './user.js'
import * as round from './round.js'

export {
  room,
  round,
  user,
  validate
}
