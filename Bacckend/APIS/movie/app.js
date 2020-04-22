var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("search");
});

app.get("/results", function(req, res){
    var query = req.query.search; //name=search(search.ejs):>whatever we put in textbox ,Stored in search
	//console.log(query);//see what we have in req.query.search
    var url = "http://www.omdbapi.com/?s=california&apikey=thewdb&r=json" + query;
	//we just add (link) with(query)so that we can search(whatever city i want ) 
    request(url, function(error, response, body){ // add url in place of LINK
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body)
            res.render("results", {data: data});
        }
    });
});



app.listen(3000, function(){
    console.log("Movie App has started!!!");
});