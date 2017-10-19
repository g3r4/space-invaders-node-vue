var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var spacesSchema = new Schema({
    spaces: Array
});

var Spaces = mongoose.model('Spaces', spacesSchema);

module.exports = Spaces;