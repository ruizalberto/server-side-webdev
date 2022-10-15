const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usages = require('../models/usage');
const { db } = require('../models/usage');

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

// CREATE OPERATION
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
    res.end('PUT operation not supported on /usages/create');
})

.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('Delete operation not supported on /usages/creste');
});

// DELETE OPERATION
usageRouter.route("/delete")
.get((req,res,next) => {
    usages.find() 
    .then((usagesfound) => { 
           res.render('deleteusage.ejs',{'usagelist' : usagesfound, title:'All Usages'} );
   }, (err) => next(err))})

.post((req, res, next) => {
    usages.findByIdAndDelete(req.params.id)
    .then((usagedeleted) => { 
        res.redirect("/delete")
    .catch((err) => next(err)); 
    }, (err) => next(err))
    .catch((err) => next(err)); 
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /usages/create');
})   

.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /usages/create');
});


module.exports = usageRouter;