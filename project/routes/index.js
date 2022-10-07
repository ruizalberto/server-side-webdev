var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Daily Usage' });
});

/* GET about us page. */
router.get('/aboutus', function(req, res, next) {
  res.render('pages/aboutus', { title: 'About Us' });
});

/* GET help page. */
router.get('/help', function(req, res, next) {
  res.render('pages/help', { title: 'Help' });
});

module.exports = router;
