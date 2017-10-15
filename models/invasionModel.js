var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var invasionSchema = new Schema({
    email: String,
    invasion: String,
    location: String,
    when: Date,
    confirmed: Boolean
});

var Invasions = mongoose.model('Invasions', invasionSchema);

module.exports = Invasions;