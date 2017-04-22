const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.validate = require('./validate');
