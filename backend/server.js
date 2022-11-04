const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const compress = require("compression");
var fileupload = require("express-fileupload");

const app = express();
app.use(fileupload());
app.use(compress());

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
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
  console.log("DB Connection done");
});

//simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to site" });
});

app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  let post = { filename: req.body.name, type: file.mimetype, data: file.data };
  let sql = "INSERT INTO fileupload SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    res.send("Post 1 added");
  });
});

app.get("/getfiles", (req, res) => {
  let sql = "SELECT * FROM fileupload";
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.send(result);
  });
});

app.get("/deletefile/:id", (req, res) => {
  console.log(+req.params.id.split(":")[1]);
  let sql = `DELETE FROM fileupload WHERE id=${+req.params.id.split(":")[1]}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
