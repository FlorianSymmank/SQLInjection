const express = require("express");
var publicviewsRouter = require("./publicviews");
var userRouter = require("./user");

module.exports = function (app) {
  app.use(express.json());
  app.use("/", publicviewsRouter);
  app.use("/api/user", userRouter);
};
