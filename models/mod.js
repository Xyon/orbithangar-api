var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence');
var Schema = mongoose.Schema;

var schema = new Schema({ 
    name: String, 
    category: Number, 
    orbVer: String, 
    author: String, 
    pictureLink: String, 
    filename: String, 
}, {timestamps: true});

schema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('mod', schema);
