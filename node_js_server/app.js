const path = require('path');
global.appRoot = path.resolve(__dirname);
const express = require("express");
const auth = require(global.appRoot + "/modules/auth");

const port = 3001;
const app = express();

app.use(auth);

require("./routes/startup")(app);

app.use(express.json());
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/images", express.static(__dirname + "public/images"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

app.listen(port, () => console.log("listening on port " + port));