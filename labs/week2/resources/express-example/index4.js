const express = require('express'), //include express
     http = require('http');

const bodyParser = require('body-parser'); //It is responsible for parsing the incoming request bodies in a middleware before you handle it

const hostname = 'localhost';
const port = 3000;

const app = express();
const morgan = require('morgan'); //it is an HTTP request level Middleware--> logs http requests and errors

app.all('/dishes', (req,res,next) => {  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
});

app.get('/dishes', (req,res,next) => {
    res.end('Will send all the dishes to you!');
});

app.post('/dishes', (req, res, next) => {
 res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /dishes');
});
 
app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all dishes');
});

app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + 
        ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});





app.use(express.static(__dirname + '/public')); //used to setup middleware for the application
const server = http.createServer(app); //.use function tells the express to use it as a middleware

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


