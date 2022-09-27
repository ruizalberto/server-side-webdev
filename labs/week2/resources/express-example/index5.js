const express = require('express'),
     http = require('http');

const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
const morgan = require('morgan');

const dishRouter = require('./routes/routes.js');



app.use(morgan('dev'));

app.use(bodyParser.json());

app.use ('/dishes', dishRouter);

app.use(express.static(__dirname + '/public'));
const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


