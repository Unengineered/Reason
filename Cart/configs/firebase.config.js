const admin = require('firebase-admin');
var serviceAccount = require('../certificates/everything-25-firebase-adminsdk-35m8b-67c3713920.json')
const db = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = {db, admin};