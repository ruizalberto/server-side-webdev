const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usages = require('../models/usage');
const { db } = require('../models/usage');

const usageRouter = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

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
.post(urlencodedParser, (req, res, next) => {
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
    res.end('Delete operation not supported on /usages/create');
});

// DELETE OPERATION
usageRouter.route("/delete")
.get((req,res,next) => {
    usages.find() 
    .then((usagesfound) => { 
           res.render('deleteusage.ejs',{'usagelist' : usagesfound, title:'All Usages'} );
   }, (err) => next(err))
})
.post((req, res, next) => {
    usages.findByIdAndDelete(req.body.id)
    .then((usagedeleted) => { 
        usages.find() 
         .then((usagesfound) => { 
                res.render('currentusage',{'usagelist' : usagesfound, title:'Deleted Correctly'} );
        }, (err) => next(err))
    .catch((err) => next(err)); 
    }, (err) => next(err))
    .catch((err) => next(err)); 
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /usages/delete');
})   
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /usages/delete');
});

// REPORT OPERATION
usageRouter.route("/report")
.get((req,res,next) => {
    res.render('newreport.ejs', { title: 'User Report' });
})
.post((req, res, next) => {
    usages.find({ name: req.body.name}) 
    .then((usagesfound) => { 
        var shopping_usage = 0;
        var education_usage = 0;
        var browsing_usage = 0;
        var social_media_usage = 0;
        for (let i = 0; i < usagesfound.length; i++) {
            shopping_usage += usagesfound[i].shopping_usage;
            education_usage += usagesfound[i].education_usage;
            browsing_usage += usagesfound[i].browsing_usage;
            social_media_usage += usagesfound[i].social_media_usage;
          }
        res.render('reportstat',{
            'usagelist' : usagesfound, 
            title: req.body.name + "'s Report", 
            name: req.body.name,
            shopping: shopping_usage,
            education: education_usage,
            browsing: browsing_usage,
            social_media: social_media_usage
        } );
    }, (err) => next(err))
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /usages/report');
})   
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /usages/report');
});

// MODIFY OPERATION
usageRouter.route("/modify")
.get((req,res,next) => {
    usages.find() 
    .then((usagesfound) => { 
           res.render('modifyusage.ejs',{'usagelist' : usagesfound, title:'All Usages'} );
   }, (err) => next(err))
})
.post((req, res, next) => {
    res.render('editusage',{ title:'Modify Usage', idToUpdate: req.body.id});
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /usages/modify');
})   
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /usages/modify');
});

// MODIFY HELPER
usageRouter.route("/modify/edit")
.post((req, res, next) => {
    usages.findOneAndUpdate({ "_id": mongoose.Types.ObjectId(req.body.idUpdate)},
    {
        $set: { 
            shopping_usage: req.body.shopping_usage,
            education_usage: req.body.education_usage,
            browsing_usage: req.body.browsing_usage,
            social_media_usage: req.body.social_media_usage,
        }
    }) 
    .then((usagemodified) => {
        usages.find() 
        .then((usagesfound) => { 
               res.render('currentusage',{'usagelist' : usagesfound, title:'Modified Correctly'} );
        }, (err) => next(err))    
    }, (err) => next(err))
});

module.exports = usageRouter;