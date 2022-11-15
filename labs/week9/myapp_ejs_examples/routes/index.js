var express = require('express');
var router = express.Router();
var example=5;
var a =5;
var b=10;
function myfunction (a,b){
return a*b
}
var data = {title:'Express Generator',
    directories:['bin', 'node_modules', 'views','public']}

var content = {title:'SSWD', chapters:
[ 'chapter1: HTTP Modules',
  'chapter2: REST API',
  'chapter3: Javascript',
  'chapter4: EJS']}
  var content2 = {title:'CA', chapters: [
  'chapter1: Number Systems',
   'chapter2: Logic Gates',
   'chapter3: Bolean Algebra',
   'chapter4: Adders']}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');

  });
//var modulename='SSWD';
  router.get('/modules', function(req, res, next) {
res.render('modules',{modulename:content.title, content:content});
});
////////////////
//////////////////////
router.get('/basicexample', function(req, res, next) {
  res.render('basic_example',{examplevar:example,myfunction:myfunction,v1:a,v2:b});
  //res.render('basic_example', {examplevar:example});
  //res.render('basic_example', {examplevar:example,v1:a,v2:b});
});
module.exports = router;
