var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

var UserRecordsSchema = new mongoose.Schema({
	user_id: { type: String, required: true, unique: true },
	user_record: String,
    datetime: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("UserRecords", UserRecordsSchema);