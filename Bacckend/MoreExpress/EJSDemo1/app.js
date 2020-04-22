var express = require("express");
var app = express();
 
app.get("/", function(req, res){
    res.render("home.ejs");                      //render sends the html data to user(by response[res])
});

app.get("/fallinlovewith/:thing", function(req, res){
  var thing = req.params.thing;
   res.render("love.ejs", {thingVar: thing});  //becoz in love.ejs file if we write (thing)directly(then it will show  
                                        //error .That thing is not defined . So thats why we write ({thingVar: thing}))
});

app.get("/posts", function(req, res){
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "My adorable pet bunny", author: "Charlie"},
        {title: "Can you believe this pomsky?", author: "Colt"}
    ];
    
    res.render("posts.ejs", {posts: posts}); // {posts:posts} both are different variable (y need to understand this)
})

app.listen(3000, function(){
   console.log("Server is listening!!!"); 
});