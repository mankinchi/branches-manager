const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('assets'));

app.get('/', (_req, res) => {
	res.sendFile(path.join(__dirname, 'assets', 'view', 'index.html'));
});

app.get('/add', (_req, res) => {
	res.sendFile(path.join(__dirname, 'assets', 'view', 'add.html'));
});

app.listen(port, () => {
	console.info(`Example app listening at http://localhost:${port}`);
});
