const express = require('express')
const http = require('http')
const morgan = require ('morgan')
const bodyParser = require('body-parser')
const dishRouter = require('./routers/dishRouter')
const hostname = 'localhost'
const port = 3000

const app = express()

function auth (req, res, next) { //this is a middleware method that have three parameters
    console.log(req.headers); //just to see the request headers
    var authHeader = req.headers.authorization; // a variable defined and initialized with the authorization header
    if (!authHeader) { // checks for request header if it has the credentials or not
        var err = new Error('You are not authenticated!'); // if not then it show this message
        res.setHeader('WWW-Authenticate', 'Basic'); // here the server shares the procedure with the client that how you can authenticate
        err.status = 401; //status code for un-authorize
        next(err);
        return;
    }
  
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':'); //when that condition is wrong means it has the credentials. Split the header to separate username name and password
    var user = auth[0]; //extracts the username from the request header
    var pass = auth[1]; // extracts password
    if (user == 'admin1' && pass == 'password') { //check the credentials against fixed correct credentials 
        next(); // authorized- go ahead
    } else {
        var err = new Error('You are not authenticated!'); //otherwise throw an error
        res.setHeader('WWW-Authenticate', 'Basic');  // share the authentication process again 
        err.status = 401;
        next(err);
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