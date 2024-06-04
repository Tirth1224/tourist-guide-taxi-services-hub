const express = require("express");
const bodyParser = require("body-parser");

const middleware = express();

middleware.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  next();
});

// Parse application/json with limit
middleware.use(bodyParser.json({ limit: "10mb" }));

// Parse application/x-www-form-urlencoded with limit
middleware.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

module.exports = middleware;
