var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transSchema = new Schema({
    amount: Number,
    date: String,
    name: String,
    tag: String
});
var userSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    income: Number,
    expenditure: Number,
    savings: Number,
    potential: Number,
    trans: [transSchema]
});
var Users = mongoose.model('user', userSchema);

// make this available to our Node applications
module.exports = Users;