"use strict";
const express = require("express");

let router = express.Router();

router.route("").get((req, res) => {
  res.sendFile(global.appRoot + "/views/index.html");
});

module.exports = router;