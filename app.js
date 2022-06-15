
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "  ";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let datas = [];
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){

  res.render("home", {homest:homeStartingContent ,publishData:datas});
});

app.get("/about", function(req,res){
  res.render("about", {about:aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact", {contact:contactContent});
});

app.get("/compose", function(req,res){
  res.render("compose");
});

app.post("/", function(req, res){
  let post ={
    title :req.body.title,
    amount:req.body.amount,
    price:req.body.price,
    address:req.body.address

  };
  datas.push(post);
  res.redirect("/");
})
app.get("/posts/:topic", function(req,res)
{
  const requestedTitle =_.lowerCase(req.params.topic);
  datas.forEach(function(post)
  {
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle === requestedTitle )
      {
        res.render("post", { title :post.title, content : post.content});
      }

  });
});



app.listen(3000, function() {
  console.log("Server start ho gya  3000 pr .");
});
