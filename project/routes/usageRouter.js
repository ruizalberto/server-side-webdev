const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usages = require('../models/usage'); //here we include the model we created using the pizza model with a particular scheme. we will use the variable to perform different operations on the database

const usageRouter = express.Router();

usageRouter.route('/')
.get((req,res,next) => {
    res.end("just checking --> nothing to do")
})
.post((req, res, next) => {
})
.put((req, res, next) => {
})
.delete((req, res, next) => {
});


usageRouter.route('/create')
.get((req,res,next) => {
    res.render('newusage.ejs', { title: 'Create New Entry' });   
})

.post((req, res, next) => {
    usages.create(req.body) 
    .then((usagecreated) => { 
        usages.find() 
         .then((usagesfound) => { 
                res.render('currentusage',{'usagelist' : usagesfound, title:'All Usages'} );
        }, (err) => next(err))
    .catch((err) => next(err)); 
    }, (err) => next(err))
    .catch((err) => next(err)); 
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /pizzas/create');
})

.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('Delete operation not  supported on /pizzas/creste');
    
});


module.exports = usageRouter;