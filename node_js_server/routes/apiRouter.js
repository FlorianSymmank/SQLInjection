const express = require("express");
const menu = require(global.appRoot + "/modules/menu");

const router = express.Router();

router.get("/menu/:date/:patientId", menu.getMenu);

module.exports = router;