var express = require('express');
var router = express.Router();
var api = require('../controllers/apiController');

/* GET setupInvasions. */
router.get('/', function(req, res, next) {
    res.send('im the apis');
});

router.get('/invasions/id/:id', function(req, res){

    api.findById(req, res);
    
});

module.exports = router;
