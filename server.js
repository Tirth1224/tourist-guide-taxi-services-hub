const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const db = require("./server/db");
const routes = require("./server/routes");
const middleware = require("./server/middleware");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 2482;

// Set the 'views' directory for EJS files
app.set("views", path.join(__dirname, "/Views"));
app.use(express.static(__dirname + "/Public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/Public")));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(middleware);

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
