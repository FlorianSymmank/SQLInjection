const express = require("express");
const publicviewsRouter = require("./publicviews");
const apiRouter = require("./apiRouter");

module.exports = function (app) {
	app.use(express.json());
	app.use("/", publicviewsRouter);
	app.use("/api", apiRouter);
};