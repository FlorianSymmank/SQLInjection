const express = require("express");
const publicviewsRouter = require("./publicviews");
const apiRouter = require("./apiRouter");
const auth = require(global.appRoot + "/modules/auth");


module.exports = function (app) {
	app.use(express.json());
	app.use("/", publicviewsRouter);
	
	app.use(express.static("public"));
	app.use("/css", express.static(__dirname + "public/css"));
	app.use("/js", express.static(__dirname + "public/js"));
	app.use("/images", express.static(__dirname + "public/images"));

	app.use(auth);
	app.use("/api", apiRouter);

	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
		const err = new Error('File Not Found');
		err.status = 404;
		next(err);
	});

	// error handler
	// define as the last app.use callback
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.send(err.message);
	});

};