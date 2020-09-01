/* global firebase */
/* eslint no-unused-vars: "off" */

const firebaseConfig = {
	apiKey: 'AIzaSyDrYYGZUME97OexecodMvSfP6rRw37D1tk',
	authDomain: 'medusa-branches.firebaseapp.com',
	databaseURL: 'https://medusa-branches.firebaseio.com',
	projectId: 'medusa-branches',
	storageBucket: 'medusa-branches.appspot.com',
	messagingSenderId: '621991997799',
	appId: '1:621991997799:web:fe8fc929e9d7e5ef683fc2',
	measurementId: 'G-96BMDM9343',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database ? firebase.database() : undefined;
const auth = firebase.auth ? firebase.auth() : undefined;

const getRef = (route) => db.ref(route);

const getDataOnce = (route, callback) => {
	getRef(route).once('value', (snapshot) => {
		callback(snapshot.val());
	});
};

const getData = (route, callback) => {
	getRef(route).on('value', (snapshot) => {
		callback(snapshot.val());
	});
};
