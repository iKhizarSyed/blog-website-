const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const request = require("request");
const https = require("https");

const homeStartingContent =
  "WELCOME TO MY BLOG WEBSITE , HERE YOU WILL FIND SOME AMAZING CONTENT IN THE UPCOMING FUTURE AND YOU TOO WILL BE ABLE TO CONTRIBUTE BY WRITING YOUR THOUGHTS IN THE COMPOSE SECTION OF THIS PAGE.. ❤️";
const aboutContent =
  "MY NAME IS SYED KHIZAR AND I'M A BEGINNER IN THE WORLD OF DEVELOPERS, LEARNING NEW CODING SKILLS EACH PASSING DAY ❤️";
const contactContent = "Call@8888700021";

const app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://khizar07:786won@cluster0.huaei6m.mongodb.net/blog-projectDB",
  { useNewUrlParser: true }
);

const postSchema = {
  title: String,

  content: String,
};

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  Post.find({}, function (err, posts) {
    res.render("home", { startingcontent: homeStartingContent, posts: posts });
  });
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
  const post = new Post({
    title: req.body.postTitle,

    content: req.body.postBody,
  });

  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content,
    });
  });
});

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("server started on port 3000");
});
