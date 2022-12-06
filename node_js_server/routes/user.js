"use strict";
const express = require("express");
const user = require(global.appRoot + "/modules/user");

let router = express.Router();

router.route("").get(user.getUser);

module.exports = router;