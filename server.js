const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // data will be store in req.body

app.get("/", function (req, res) {
  res.send("Welcome to the hotel");
});

const personRoutes = require('./routes/personRoutes');
app.use('/', personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/', menuRoutes);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
