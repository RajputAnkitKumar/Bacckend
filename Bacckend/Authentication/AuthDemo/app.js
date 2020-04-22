var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")
    
mongoose.connect("mongodb://localhost/cat_app",
				 { useNewUrlParser: true,
				    useUnifiedTopology: true
				 });
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",// we use secret for encoding and decoding the session
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());// we need these two lines whenever we are going to use passport.
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); // run after 73 line
passport.serializeUser(User.serializeUser());//they responsible for reading the session ,taking the data from the session that's encoded and un-coded it .Thats the deserialise and then encoding it serialisation
// and putting it back to the session which is what serialise user does. 
passport.deserializeUser(User.deserializeUser());

//============
// ROUTES
//============

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret",isLoggedIn, function(req, res){ // isLoggedIn is a function define below and By ding this we will not go to scret page directly OK
	// first it check for /secret and then it go for isloggedIn function
	// 1 important thing is :> next will refer to [actually pass to isLoggedIn] but refer to{ function(req, res)}
   res.render("secret"); 
});

// Auth Routes

//show sign up form
app.get("/register", function(req, res){
   res.render("register"); 
});
//handling user sign up
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){// it take username as object and password as argument // it take username as object and password as argument  And User.register working here as a function  
			// and 1 more thing :>password will not gonna save in our database but instead of password it will save hash and salt :> look at the screenshot. This hash will take care of everything 

            console.log(err);
            return res.render('register');  // User.register working here as a function
        }
        passport.authenticate("local")(req, res, function(){ // this line run if no short circuiting happen.This line actually lig the user in [it will take care of everything int the session] It will store the correct information,it will run the serialised user method
			
           res.redirect("/secret");
        });
    });
});

// LOGIN ROUTES
//render login form
app.get("/login", function(req, res){
   res.render("login"); 
});
//login logic
//middleware
// local and success....,failu... are 2 arguments
//basically it run first before function here and checkout your details that :>your username and password are same or not :> in place of password it check for hash code....
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res){
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(3000, process.env.IP, function(){
    console.log("server started.......");
})