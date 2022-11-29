"use strict";
const express = require("express");
const example_endpoint = require(global.appRoot + "/modules/example_endpoint");

let router = express.Router();

router.route("").get(example_endpoint.getAllergen);

module.exports = router;

