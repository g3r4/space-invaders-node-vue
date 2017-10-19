var Spaces = require('../models/spacesModel');
var bodyParser = require('body-parser');
var configValues = require('../config/config.json');

Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) { //To test values in nested arrays
            if (!this[i].compare(testArr[i])) return false;
        }
        else if (this[i] !== testArr[i]) return false;
    }
    return true;
}

module.exports = function(){

    if (!configValues.hasOwnProperty('spaces') ){
        throw new Error("There is no spaces Array defined on config.json file");
    } else if (configValues.spaces.length === 0) {
        throw new Error("The spaces Array defined on config.json file is Empty");        
    }

    Spaces.find({ }, function(err, spaces){
        if (err){
            // throw err;
            console.log(err);
        }
        // If there is no spaces Array stored in the database, create one
        if (spaces.length === 0){
            Spaces.create( { spaces: configValues.spaces }, function(err, results){
                if (err) throw err;
                console.log(results);
                console.log("Spaces database document created for the first time");                

            }); 
        // If there is a space Array but is different than the one on the config file, replace it
        } else if (!spaces[0].spaces.sort().compare(configValues.spaces.sort())){
            Spaces.findByIdAndUpdate(spaces[0]['_id'], { spaces: configValues.spaces }, function(err, results){
                if (err) throw err;
                console.log(results);
                console.log("Spaces database document updated to match spaces Array defined on config.json");                                
            });
        }
        console.log("Spaces database document matches spaces Array defined on config.json");
    }); 

    // });
}