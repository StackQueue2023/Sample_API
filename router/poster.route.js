const express = require("express");
const connection = require("../config/database");
const route = express.Router();
const upload = require("../helper/upload-image");

//POst poster

route.post("/poster", upload.single("image"), (req, res) => {
  let data = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No image selected" });
  }

  const imageUrl = `${req.file.filename}`;

  const url = `http://localhost:3000/poster/${imageUrl}`;

  query = `INSERT INTO poster (title, image, caption) VALUES (?, ?, ?)`;

  connection.query(
    query,
    [data.title, imageUrl, data.caption],
    (err, result) => {
      if (!err) {
        return res.status(200).json({
          message: "Poster Added Successfully!!!",
          url: url,
        });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

//Get

route.get("/poster", (req, res) => {
  query = `SELECT * FROM poster`;

  connection.query(query, [], (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = route;
