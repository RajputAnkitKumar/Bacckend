var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose); // it adds the bunch of method with [user schema] that come up with ("passport-local-mongoose") // we also use those two methods automatically serialise and deserialise
// if we use this[ UserSchema.plugin(passportLocalMongoose) ].

module.exports = mongoose.model("User", UserSchema);