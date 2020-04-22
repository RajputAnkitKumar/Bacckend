  
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app",
				 { useNewUrlParser: true,
				    useUnifiedTopology: true
				 });/*overhere we connect with mongoose
server and cat_app is our database and this database will automatically created*/

var catSchema = new mongoose.Schema({ // we just creating schema overhere
   name: String,
   age: Number,
   temperament: String
});

var Cat = mongoose.model("Cat", catSchema);// here we took schema of catSchema and complied by model and save it into Cat variable and "Cat" is name of our model

// we comment below code because every time we run this code we will get new cat or y can //say duplicate cat

//adding a new cat to the DB

// var george = new Cat({     // var george is a variable and new is keyboard
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save(function(err, cat){ // this fn will save data to our database
                                   //error come suppose when internet is not working
                                  // or mongodb server is not working
                                // cat is nothing but a variable in which data is 
                                // sent back from the database [where george is saved
                                // or other data is saved]
//     if(err){
//         console.log("SOMETHING WENT WRONG!")
//     } else {
//         console.log("WE JUST SAVED A CAT TO THE DB:")
//         console.log(cat);
//     }
// });

Cat.create({  // it also create cats but it make more sense and if you run it multiple time then it also make duplicate copy of it
   name: "Snow White",
   age: 15,
   temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
		console.log("I'm run in last");
        console.log(cat);
    }
});

//retrieve all cats from the DB and console.log each one

Cat.find({}, function(err, cats){  // it just took all the data from the database
    if(err){
        console.log("OH NO, ERROR!");
        console.log(err);
    } else {
        console.log("ALL THE CATS.....");
        console.log(cats);
    }
}); 