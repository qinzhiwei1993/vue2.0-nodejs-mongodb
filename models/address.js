var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var addressSchema = new Schema({
    accountId: String,
    recName: String,
    recPhone: Number,
    recAdress: String
})

mongoose.model('Address', addressSchema);
