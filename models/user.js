var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
name: {
    type: String,
    default:''
},
username: {
    type: String,
    default:''
},
contact: {
    type: Number,
    default:''
},
designation: {
    type: String,
    default:''
},
address:{
    street:{
        type: String,
        default:''
    },
    city: {
        type: String,
        default:''
    },
    state: {
        type: String,
        default:''
    }
},
interests: {
    type: [String],
    default: []
},
commentid:{
    type: [String],
    default:[]
}
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
