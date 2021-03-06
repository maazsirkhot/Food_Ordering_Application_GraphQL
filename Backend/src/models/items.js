var mongoose = require('mongoose');
var Schema = mongoose.Schema;

Items = new Schema({
    itemname: {
        type: String,
        required : true
    },
    itemdescription: {
        type: String,
        required : true
    },
    restname: {
        type: String,
        required : true
    },
    itemprice: {
        type: Number,
        required : true
    },
    section: {
        type: String,
        required : true
    }   
})

module.exports = mongoose.model('items', Items);