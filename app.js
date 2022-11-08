const path = require('path');
global.appRoot = path.resolve(__dirname);
const port = 3000;

const express = require("express");
const app = express();
require("./routes/startup")(app);

app.listen(port, () => console.log("listening on port " + port));

app.use(express.json());
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/images", express.static(__dirname + "public/images"));