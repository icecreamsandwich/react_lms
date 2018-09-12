var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MiscSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  // datetime: {
  //   type: Date,
  //   default: Date.now,
  // },
  active: {
      type: Number,
      default: 1
  }
});

var Misc = mongoose.model('Misc', MiscSchema);
module.exports = Misc;
