
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//Im getting all those error just because i didnt have the value of Heriomoni in our database

// POST - title, content
var postSchema = new mongoose.Schema({    //post schema
   title: String,
   content: String
});
var Post = mongoose.model("Post", postSchema); // post model

// USER - email, name
var userSchema = new mongoose.Schema({        // user schema
    email: String,
    name: String,
    posts: [postSchema]                      // we need to declare it first{var postSchema = new mongoose.Schema} otherwise it will show error at this point
	// and 1 more thing [we write this code just because we want to check our { 1 to many } relation
});
var User = mongoose.model("User", userSchema);  // user model

// var newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger"
// });

// newUser.posts.push({
//     title: "How to bre polyjuice potion",
//     content: "Just kidding.  Go to potions class to learn it!"
// });

// newUser.save(function(err, user){
//   if(err){
//       console.log(err);
//   } else {
//       console.log(user);
//   }
// });


// Overhere we use Post just to check out  [  posts: [postSchema]  ] is working properly or not 

// var newPost = new Post({              
//     title: "Reflections on Apples",
//     content: "They are delicious"
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });


User.findOne({name: "Hermione Granger"}, function(err, user){
    if(err){
        // console.log(err);
    } else {
        user.posts.push({
            title: "3 Things I really hate",
            content: "Voldemort.  Voldemort. Voldemort"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});