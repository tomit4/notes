// Taken from (does not work on its own):
// https://scribe.rip/m/global-identity-2?redirectUrl=https%3A%2F%2Fcodeburst.io%2Fpolling-vs-sse-vs-websocket-how-to-choose-the-right-one-1859e4e13bd9

const express = require('express');
const events = require('./events');
const path = require('path');

const app = express();

const port = process.env.PORT || 5001;

const expressWs = require('express-ws')(app);

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.ws('/', function(ws, req) {
	const githubEvent = {}; // sample github Event from Github event API https://api.github.com/events
	ws.send('message', githubEvent);
});

app.listen(port, function() {
	console.log('Listening on', port);
});
