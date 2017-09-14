var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var bankSchema = new Schema({
    accountNumber: String,
    bankName: String,
    bankBranch: String,
    IFSCCode: String,
    accountName: String,

});
var Banks = mongoose.model('bank', bankSchema);

// make this available to our Node applications
module.exports = Banks;