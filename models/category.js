var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence');
var Schema = mongoose.Schema;

var schema = new Schema({ 
    name: String, 
});

schema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('category', schema);
