var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');
var crypto = require('crypto');
SALT_WORK_FACTOR = 16;

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

/*UserSchema.methods.setPassword = function (password, cb) {
    if (!password) {
        return cb(new BadRequestError(options.missingPasswordError));
    }

    var self = this;

    crypto.randomBytes(SALT_WORK_FACTOR, function(err, buf) {
        if (err) {
            return cb(err);
        }

        var salt = buf.toString('hex');

        crypto.pbkdf2(password, salt, 10000, 16,'sha1', function(err, hashRaw) { //crypto.pbkdf2(password, salt, 10000, 512, 'sha', function(err, hashRaw) {
            if (err) {
                return cb(err);
            }

            self.set("hash", new Buffer(hashRaw, 'binary').toString('hex'));
            self.set("salt", salt);

            cb(null, self);
        });
    });
};
*/
module.exports = mongoose.model("User", UserSchema);