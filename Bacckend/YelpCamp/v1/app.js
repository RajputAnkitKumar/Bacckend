
  
var express = require("express");
var app = express();
var bodyParser = require("body-parser");//need to install npm install body-parser --save

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
];
    
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){  // show campgrounds
    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){ // create new campground
    // get data from form and add to campgrounds array
    var name = req.body.name;   //req.body.name:>catch name from "/campgrounds/new"
    var image = req.body.image;  //req.body.image:>catch image from "/campgrounds/new"
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){ //it should show the form that send the data to above post route
   res.render("new.ejs"); //Remember In image textbar :put a right link
});

app.listen(3000, function(){
   console.log("The YelpCamp Server Has Started!");
});
