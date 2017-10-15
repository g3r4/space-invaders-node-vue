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

router.get('/invasions/q', function(req, res){
    api.findByQuery(req, res);
});

router.get('/invasions/when/:year/:month/:day', function(req, res){
    api.findByDay(req, res);
});

module.exports = router;
