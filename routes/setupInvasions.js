var express = require('express');
var router = express.Router();
var setupInvasions = require('../controllers/setupController');

/* GET setupInvasions. */
router.get('/setupInvasions', function(req, res, next) {
  res.send(setupInvasions());
});

module.exports = router;
