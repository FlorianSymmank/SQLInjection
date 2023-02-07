const path = require('path');
global.appRoot = path.resolve(__dirname);
const express = require("express");

const port = 3001;
const app = express();

require("./routes/startup")(app);

app.listen(port, () => console.log("listening on port " + port));