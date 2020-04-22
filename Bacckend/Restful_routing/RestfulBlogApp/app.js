var bodyParser = require("body-parser"),
methodOverride = require("method-override"),       //npm install method-override --save
expressSanitizer = require("express-sanitizer"),  //npm install express-sanitizer --save
	//we use sanitizer just because we give free access of <textarea> to user , it might possible that he may write some harmful code of javascript . so what we do we just add a filter for filtering the html.
	// and we mostly used during [create and update ] route . See down, y will get the code
mongoose       = require("mongoose"),
express        = require("express"),
app            = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app",
				 { useNewUrlParser: true,
				    useUnifiedTopology: true
				 });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); //there's a rule that this line come after(app.use(bodyParser.urlencoded({extended: true}));) 
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String, 
	//image:{type: String, default :"placeholderimage.jpg"}  //It basically means if we'll enter the string then it will automatically take ("placeholderimage.jpg") as a image
    body: String,
    created: {type: Date, default: Date.now}//whenever user created the blog then just grap that date
	// and this is a object OK
	// created : Date // we can also used
});
var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES

app.get("/", function(req, res){
   res.redirect("/blogs"); 
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
   Blog.find({}, function(err, blogs){
       if(err){
           console.log("ERROR!");
       } else {
          res.render("index", {blogs: blogs}); 
       }
   });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    // create blog
    console.log(req.body);
	 req.body.blog.body = req.sanitize(req.body.blog.body)
    console.log("===========")
    console.log(req.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            //then, redirect to the index
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: foundBlog});
       }
   })
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
})


// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)//req.body:>whatever coming from the body
	                                                     //.blog.body:> because of screenshot737
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){// (id,newData,callData)
      if(err){
          res.redirect("/blogs");
      }  else {
          res.redirect("/blogs/" + req.params.id); // return with new data
      }
   });
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
   //destroy blog
   Blog.findByIdAndRemove(req.params.id, function(err){ //(error)becoz there's no data that we want to do anything
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
   })
   //redirect somewhere
});

app.listen(3000, function(){
    console.log("SERVER IS RUNNING!");
})