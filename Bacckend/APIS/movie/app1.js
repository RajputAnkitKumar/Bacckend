var express = require("express");
var app = express();
var request = require("request");

app.get("/results", function(req, res){
	//res.send("Hello it works"); //we can run only 1 res.send at a time 
	request("http://www.omdbapi.com/s=california&apikey=thewdb",function(error,response,body){
		 if(!error && response.statusCode == 200) {
		//	 res.send(body["Search"][0]);//it is a string and we need to convert it to object by(var data = JSON.parse(body)) 
            var data = JSON.parse(body)
           res.send(data["Search"][0]);
        }
	});
});

app.listen(3000, function(){
    console.log("Movie App has started!!!");
});