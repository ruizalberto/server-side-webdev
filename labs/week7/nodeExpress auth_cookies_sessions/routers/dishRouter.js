const express = require('express');

const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json())

dishRouter.route('/')
.all((req,res,next)=>{
    console.log(req.url);
    console.log(req.headers);
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next()

})

.get((req,res,next)=>{
    res.end('Will send all the dishes to you')
})

.post((req,res,next)=>{
    res.end('Will update :'+req.body.name+' '+req.body.description);
})

.put((req,res,next)=>{
    res.statusCode=403;
    res.end('Put operation not supported :'+req.body.name+' '+req.body.description);
})

.delete((req,res,next)=>{
    res.end('Delete all the dishes')
});



dishRouter.route('/:dishId')
.all((req,res,next)=>{
    console.log(req.url);
    console.log(req.headers);
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next()

})

.get((req,res,next)=>{
    res.end('Will send dish '+ req.params.dishId)
})

.post((req,res,next)=>{
    res.write('Will update dish :'+ req.params.dishId);
    res.end('Will update dish :'+ req.params.dishId+ ' with '
    +req.body.name+' '+req.body.description);
})

.put((req,res,next)=>{
    res.statusCode=403;
    res.end('Put operation not supported :'+ req.params.dishId);
})

.delete((req,res,next)=>{
    res.end('Deleting dish '+ req.params.dishId)
    
});

module.exports = dishRouter;