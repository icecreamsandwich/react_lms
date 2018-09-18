var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeaveDetailsSchema = new Schema({
    user_id: {
       type: String,
       default: ""
    },
    CL: {
      type: Number, 
      default: 5
    },
    SL: {
        type: Number,
        default: 7
    },
    AL: {
        type: Number,
        default: 12
    },
    LOP: {
        type: String,
        default: ""
    },
    datetime: {
        type: Date,
        default: Date.now,
    },
});

var LeaveDetails = mongoose.model('LeaveDetails', LeaveDetailsSchema);
module.exports = LeaveDetails;