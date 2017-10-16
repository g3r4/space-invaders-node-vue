var express = require('express');
var router = express.Router();
var api = require('../controllers/apiController');
var setupInvasions = require('../controllers/setupController');

router.get('/', function(req, res, next) {
    res.send('im the apis');
});

router.get('/setupInvasions', function(req, res, next) {
    setupInvasions.Initialize(req, res);
});

router.get('/invasions/id/:id', function(req, res){
    api.findById(req, res);
});

router.get('/invasions/q', function(req, res){
    api.findByQuery(req, res);
});

router.get('/invasions/:year/:month/:day', function(req, res){
    api.findByDay(req, res);
});

router.post('/invasions', function(req, res){
    api.createOrUpdateInvasion(req, res);
});

router.delete('/invasions', function(req, res){
    api.deleteInvasionById(req, res);
});

module.exports = router;
