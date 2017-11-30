var express = require("express");
var router = require("./router.js");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./public"));
app.use("/api", router);
app.use("*", function(req, res) {
    res.send("Resource not found (404).");
});

app.listen(3000, function() {
    console.log("Server started at PORT 3000");
});
