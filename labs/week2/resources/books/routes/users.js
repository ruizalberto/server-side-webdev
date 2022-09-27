var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) { // /user
  res.send('respond with a resource');
});
router.get('/create', function(req, res, next) {
  res.send('respond with a resource/create');
});

module.exports = router;
