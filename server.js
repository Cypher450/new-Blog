const express = require("express");
const ejs = require("ejs");
const app = express();
const bodyParser = require("body-parser");
const _ = require('lodash');
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:3000/personalblogDB");

const blogSchema = {
  title: String,
  content: String
}

const blog = mongoose.model("Blog", blogSchema);

const homeStartingContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vestibulum lectus mauris ultrices eros in. Ridiculus mus mauris vitae ultricies. Nulla porttitor massa id neque aliquam vestibulum. Dui ut ornare lectus sit. Turpis egestas sed tempus urna. Mattis pellentesque id nibh tortor id aliquet lectus proin nibh. Non arcu risus quis varius quam quisque id diam vel. Malesuada fames ac turpis egestas integer eget. Aliquet nibh praesent tristique magna sit amet purus.";
const contactContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vestibulum lectus mauris ultrices eros in. Ridiculus mus mauris vitae ultricies. Nulla porttitor massa id neque aliquam vestibulum. Dui ut ornare lectus sit. Turpis egestas sed tempus urna. Mattis pellentesque id nibh tortor id aliquet lectus proin nibh. Non arcu risus quis varius quam quisque id diam vel. Malesuada fames ac turpis egestas integer eget. Aliquet nibh praesent tristique magna sit amet purus.";


// Serve static files from the "public" directory
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  // res.render("Home", { homeCont: homeStartingContent, posts: posts });

  blog.find({}).then(function(posts, err){
    res.render("Home", {homeCont : homeStartingContent, posts: posts});
  })
});

app.get("/about", function (req, res) {
  res.render("About", { aboutCont: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactCont: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose", {});
});

app.post("/compose", function (req, res) {

  const item = new blog({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  item.save().then(function(err){
    if(!err){
      res.redirect("/");
    }
  });

  // const post = { title: req.body.postTitle, content: req.body.postBody };
  // posts.push(post);
  res.redirect("/");
});

app.get("/posts/:test", function(req, res){
  const val = _.lowerCase(req.params.test);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (val === storedTitle) {
      res.render("post",{heading: post.title, postBody: post.content})
    }
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
