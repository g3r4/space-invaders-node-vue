var express = require('express');
var router = express.Router();
var setupInvasions = require('../controllers/setupController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(setupInvasions());
});

module.exports = router;
