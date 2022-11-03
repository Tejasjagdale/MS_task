const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const upload = multer();

const app = express();

var corsOptions = {
  origin: "http://localhost:3000/",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to site" });
});


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ms_task",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connection done");
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
