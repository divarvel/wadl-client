var http = require("http");
var express = require("express");
var textBody = require("body");

var app = express();

app.use(express.static(__dirname + "/.."));

app.get("/test/static", function(req, res) {
  res.send("OK");
});

app.get("/test/query", function(req, res) {
  res.send(req.query.a ? "a=" + req.query.a : "NOK");
});

app.get("/test/dynamic/:param", function(req, res) {
  res.send(req.params.param);
});

app.get("/test/private", function(req, res) {
  res.send(req.headers.authorization == "12345" ? "OK" : "NOK");
});

app.post("/test/upload", function(req, res) {
  textBody(req, function(err, body) {
    res.send(body);
  });
});

app.put("/test/private/upload", function(req, res) {
  textBody(req, function(err, body) {
    res.send(req.headers.authorization == "12345" ? body : "NOK");
  });
});

app.get("/test/json", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({
    a: 1,
    b: 2
  }));
});

app.get("/test/xml", function(req, res) {
  res.setHeader("Content-Type", "application/atom+xml");
  res.send("<a>1</a>");
});

app.get("/test/json/fail", function(req, res) {
  res.statusCode = 400;
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({
    a: 1,
    b: 2
  }));
});

var server;

exports.start = function() {
  console.log("test server is listening on port 3000");
  server = http.createServer(app);
  server.listen(3000);
};

exports.stop = function() {
  console.log("stop test server");
  server.close();
};
