const express = require("express");
const login = require(global.appRoot + "/modules/login");

const router = express.Router();

router.get("/", login.login);

module.exports = router;