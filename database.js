const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-service-worker.json');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://medusa-branches.firebaseio.com',
});

module.exports = admin.database();
