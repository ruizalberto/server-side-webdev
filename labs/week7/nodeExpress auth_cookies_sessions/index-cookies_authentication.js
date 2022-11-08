const express = require('express')
const http = require('http')
const morgan = require ('morgan')
const bodyParser = require('body-parser')
const dishRouter = require('./routers/dishRouter')
var cookieParser = require('cookie-parser'); //required for handling cookies
const hostname = 'localhost'
const port = 3000

const app = express()

app.use(cookieParser('12345-67890-09876-54321')); //the secret key of the signed cookies

function auth (req, res, next) { // the authentication function that handles the authentication process

  if (!req.signedCookies.user) { // we check if the request include the signed cookies or not
    var authHeader = req.headers.authorization; // this part will be executed if the cookies not included in the request header
    if (!authHeader) { // if the authentication header is not set means its the first request
        var err = new Error('You are not authenticated!'); 
        res.setHeader('WWW-Authenticate', 'Basic');        // the server responds with an error message and provides information on how to authenticate      
        err.status = 401; // un-authorized status
        next(err);
        return;
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':'); // if the authentication header is set then split the authentication header and retrive the user name and password
    var user = auth[0]; // here the user name
    var pass = auth[1]; // here we extract the password from the request-header
    if (user == 'admin' && pass == 'password') { // checks the credential. It they are correct then 
        res.cookie('user','admin',{signed: true}); // the server creates/sets a cookie with a name user and value admin
        next(); // authorized
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');  // the server sets the authentication header in the response by providing information on how to authenticate            
        err.status = 401;
        next(err);
    }
  }
  else {
      if (req.signedCookies.user === 'admin') { // if the signed cookie is found and its value is equal to the va;ue set by the server
          next(); // allows authentication
      }
      else {
          var err = new Error('You are not authenticated!');
          err.status = 401;
          next(err);
      }
  }
}

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