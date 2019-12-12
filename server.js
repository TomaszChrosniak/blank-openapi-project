"use strict";

const { initialize } = require("express-openapi"),
	path = require("path"),
	fs = require("fs"),
    bodyParser = require("body-parser"),
    express = require("express");

const app = express();

initialize({
	app,
	apiDoc: fs.readFileSync(path.resolve(__dirname, "oas.json"), "utf8"),
	consumesMiddleware: {
		"application/json": bodyParser.json({ type: "application/json" })
	},
	errorMiddleware: function(err, req, res, next) {
		// just log the error
		console.error(err);
		res.status(500).end();
	},
	logger: {
		info() {
			console.log(...arguments);
		},
		debug() {
			console.log(...arguments);
		},
		error() {
			console.error(...arguments);
		},
		trace() {
			console.trace(...arguments);
		},
		warn() {
			console.warn(...arguments);
		},
		log() {
			console.log(...arguments);
		}
	},
	paths: path.resolve(__dirname, "routes"),
	promiseMode: true
});

const host = "localhost", port = 8080;

app.listen(port, host, function() {
	console.log(`Listening at ${host}:${port}.`);
});
