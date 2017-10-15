var Invasions = require('../models/invasionModel');
var bodyParser = require('body-parser');

var result = 'nada';

module.exports = {
    findById: function(req, res) {
     //   res.send('fuck you');
        Invasions.find({ _id: req.params.id },
            function(err, invasions){
            if (err) throw err;

            res.send(invasions);
        });
    }
}