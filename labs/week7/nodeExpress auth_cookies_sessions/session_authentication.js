const express = require('express')
const http = require('http')
const morgan = require ('morgan')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
const dishRouter = require('./routers/dishRouter')
//// needed for session ////////
var session = require('express-session');
var FileStore = require('session-file-store')(session);

const hostname = 'localhost'
const port = 3000

const {appendFile} = require('fs');

const app = express()

function auth (req, res, next) {
    console.log(req.session);
  
    if (!req.session.user) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');                        
            err.status = 401;
            next(err);
            return;
        }
        var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if (user == 'admin' && pass == 'password') {
            req.session.user = 'admin';
            next(); // authorized
        } else {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            next(err);
        }
    }
    else {
        if (req.session.user === 'admin') {
            console.log('req.session: ',req.session);
            next();
        }
        else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
  }
  
  app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
  }));
  app.use (morgan('dev'))
  app.use (bodyParser.json())
  
  app.use(auth);
  app.use('/dishes',dishRouter)
  
  app.use (express.static(__dirname+'/public'))
  
  app.use((req,res,next)=>{
      console.log(req.url);
      console.log(req.headers);
      res.statusCode=200;
      res.setHeader('Content-Type','text/html');
      res.end('<html><body><h1>This is an Express Server </h1></body></html>')
  
  })
    

const server = http.createServer(app)
server.listen(port,hostname,()=>{
    console.log(`server started on http://${hostname}:${port}`)
})