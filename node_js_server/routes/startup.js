const express = require("express");
var publicviewsRouter = require("./publicviews");
var userRouter = require("./user");
var exampleRouter = require("./example");

module.exports = function (app) {
  app.use(express.json());
  app.use("/", publicviewsRouter);
  app.use("/api/user", userRouter);
  app.use("/api/example-endpoint", exampleRouter);
};
