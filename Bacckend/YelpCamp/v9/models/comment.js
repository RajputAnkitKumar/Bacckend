var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    author: {      //creating object // and we just doing this just becoz, we just want to save meaningful data (not like hash,salt)  
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);