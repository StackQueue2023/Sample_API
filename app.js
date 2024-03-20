require("dotenv").config();

const express = require("express");
const connection = require("./config/database");

const app = express();

app.use(express.urlencoded({ extended: true })); // for getting value
app.use(express.json());

//call route
const myPosterRoute = require("./router/poster.route");

//call the api route after "user"
app.use("/poster", express.static("uploads"));
//eg: http://localhost:3000/poster/1696057272364.jpeg

//Sample Get Method
app.get("/", (req, res) => {
  res.json({
    success: 1,
    message: "This is My First REST API Poster...",
  });
});

app.use("/post", myPosterRoute);

app.use("/get", myPosterRoute);

//Listening Port
app.listen(3000, () => {
  console.log("Server Connected SuccessFully  " + process.env.APP_PORT);
});
