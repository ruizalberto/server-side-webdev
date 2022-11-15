var express = require('express');
var router = express.Router();
var data = {title:'Express Generator',
    directories:['bin', 'node_modules', 'views','public']}
const user = {
    firstName: 'John',
    lastName: 'No Last Name',
    admin: true,
    }
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('index2',{Data:data})
});

router.get('/admin', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('index3',{user:user})
});
module.exports = router;

