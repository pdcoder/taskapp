var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var commentSchema = new mongoose.Schema({
    from : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendance' 
    },
    message:{
        type: String
    }
});

commentSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Comment", commentSchema);