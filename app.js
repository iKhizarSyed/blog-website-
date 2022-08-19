const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "WELCOME TO MY BLOG WEBSITE , HERE YOU WILL FIND SOME AMAZING CONTENT ❤️";
const aboutContent = "MY NAME IS SYED KHIZAR AND I'M A BEGINNER IN THE WORLD OF DEVELOPERS, LEARNING NEW CODING SKILLS EACH PASSING DAY ❤️";
const contactContent = "EMAIL ID : Khizarsyed786@gmail.com";

const app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));

const posts = [];

app.get("/", (req, res) => {
  res.render("home", { startingcontent: homeStartingContent, posts: posts });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutcontentnote: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { ContactContentNote: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.inputTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach((post) => {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });
});

app.listen(3000, (req, res) => {
  console.log("server started on port 3000");
});
