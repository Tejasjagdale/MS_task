const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
var fileupload = require("express-fileupload");

const app = express();
app.use(fileupload());
app.use(express.static("public"));

var corsOptions = {
  origin: "http://localhost:3000/",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

//simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to site" });
});

app.post("/upload", (req, res) => {
  console.log(req.body)
  let post = { filename: "file1", type: "pdf" };
  let sql = "INSERT INTO fileupload SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log("result");
    res.send("Post 1 added");
  });
});



// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
