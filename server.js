require('dotenv').config();

const express = require('express');
const path = require('path');
const axios = require('axios');

const db = require('./database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('assets'));
app.use(express.json());

app.get('/', (_req, res) => {
	res.sendFile(path.join(__dirname, 'assets', 'view', 'index.html'));
});

app.get('/add', (_req, res) => {
	res.sendFile(path.join(__dirname, 'assets', 'view', 'add.html'));
});

app.get('/login', (_req, res) => {
	res.sendFile(path.join(__dirname, 'assets', 'view', 'login.html'));
});

app.post('/api/change-issue', async (req, res) => {
	try {
		const {
			email,
			password,
			server,
			branch,
		} = req.body;

		const { data } = await axios.post(
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY}`,
			{
				email,
				password,
				returnSecureToken: true,
			},
		);

		db.ref('/issues').once('value', (snapshot) => {
			const issues = snapshot.val();

			let toBeUpdatedIssueId = '';
			for (const [issueId, { branch: issueBranch }] of Object.entries(issues)) {
				if (issueBranch === branch) {
					toBeUpdatedIssueId = issueId;
					break;
				}
			}

			db.ref(`/users/${data.localId}/${server}`).update({
				issue: toBeUpdatedIssueId,
			});
		});

		res.status(200).send('Successfully change branch on Branches Manager');
	} catch ({ response }) {
		const { error } = response.data;
		console.error(error.message);
		res.status(400).send(error.message);
	}
});

app.listen(port, () => {
	console.info(`Example app listening at http://localhost:${port}`);
});
