var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeaveRequestsSchema = new Schema({
    emp_id: {
      type: String,
       default: ""
    },
    group_id: {
      type: String, 
      default: ""
    },
    firstName: {
        type: String,
        default: ""
    },
    leaveType: {
        type: String,
        default: ""
    },
    noOfLeaves: {
        type: String,
        default: ""
    },
    leaveTitle: {
        type: String,
        default: ""
    },
    leaveBody: {
        type: String,
        default: ""
    },
    datetime: {
        type: Date,
        default: Date.now,
    },
    approved: {
        type: Boolean,
        default: false
    }
});

var LeaveRequests = mongoose.model('LeaveRequests', LeaveRequestsSchema);
module.exports = LeaveRequests;