var express = require("express");
var app = express();
var bodyParser = require("body-parser"); // (req.body.newfriend;)this thing run with the help of this

app.use(bodyParser.urlencoded({extended: true})); // this is something that we just need to copy and past After [var bodyParser = require("body-parser")]
app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"]; // scope here is public

app.get("/", function(req, res){
   res.render("home"); 
});

app.post("/addfriend", function(req, res){
    var newFriend = req.body.newfriend;   // i just pass new value in newfriend and req.body would take every thing and put in new friend[But before that we need to add a package (npm install body-parser --save)so that we can get the body]
    friends.push(newFriend);
    res.redirect("/friends"); //when we put in url (/friends)it will go to friends.ejs and in this file .We have form .With the help of form we add friend and By Action send to 
	//(/addfriend(it is in app.js file(ok)))Here we add friend to our queue. And redirect to old (/friend )page [by clicking on button] 
});

app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
});

app.listen(3000, function(){
   console.log("Server started!!!"); 
});