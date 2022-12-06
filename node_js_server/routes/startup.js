const express = require("express");
const publicviewsRouter = require("./publicviews");
const apiRouter = require("./apiRouter");
const userRouter = require("./user");
const exampleRouter = require("./example");

module.exports = function (app) {
	app.use(express.json());
	app.use("/", publicviewsRouter);
	app.use("/api", apiRouter);
	app.use("/api/user", userRouter);
	app.use("/api/example-endpoint", exampleRouter);
};