const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "THIS IS SOME CONTENT MADE FOR THE HOME PAGE";
const aboutContent = "THIS IS SOME CONTENT MADE FOR THE ABOUT PAGE";
const contactContent = "THIS IS SOME CONTENT MADE FOR THE CONTACT PAGE";

const app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home", { startingcontent: homeStartingContent });
});

app.listen(3000, (req, res) => {
  console.log("server started on port 3000");
});
