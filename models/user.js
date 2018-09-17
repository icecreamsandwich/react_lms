var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	userType: String,
	picture: String,
	password: String,
	groupId: String,
	designationId: String,
	active: {
        type: Number,
        default: 0
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);