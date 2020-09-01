const express = require('express');
const path = require('path');

const db = require('./database');

const app = express();
const port = 3000;

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

app.post('/api/change-issue', (req, res) => {
	const {
		server,
		branch,
	} = req.body;

	db.ref('/issues').once('value', (snapshot) => {
		const issues = snapshot.val();

		let toBeUpdatedIssueId = '';
		for (const [issueId, { branch: issueBranch }] of Object.entries(issues)) {
			if (issueBranch === branch) {
				toBeUpdatedIssueId = issueId;
				break;
			}
		}

		db.ref(`/users/tri/${server}`).update({
			issue: toBeUpdatedIssueId,
		});
	});
	res.status(200).json({
		a: 1,
	});
});

app.listen(port, () => {
	console.info(`Example app listening at http://localhost:${port}`);
});
