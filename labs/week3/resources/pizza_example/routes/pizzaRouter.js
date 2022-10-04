const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const pizzas = require('../models/pizza'); //here we include the model we created using the pizza model with a particular scheme. we will use the variable to perform different operations on the database

const pizzaRouter = express.Router();

pizzaRouter.route('/')
.get((req,res,next) => {
    res.end("just checking --> nothing to do")
})
.post((req, res, next) => {
})
.put((req, res, next) => {
})
.delete((req, res, next) => {
});


pizzaRouter.route('/create')
.get((req,res,next) => {
    res.render('newpizza.ejs', { title: 'Pizza shop' });   
})

.post((req, res, next) => {
    pizzas.create(req.body) // the request body should provide name, description, and customer as defined in the pizza model -->schema
    .then((pizzacreated) => { //if the pizza is created then pizzacreated is set
        pizzas.find() // if it is set then execute find function to find the pizzas in the list
         .then((pizzasfound) => { //if there are pizzas then provide the list in the next line
                res.render('currentorder',{'pizzalist' : pizzasfound, title:'All Pizzas'} );
        }, (err) => next(err))
    .catch((err) => next(err)); // if pizza.create is not successful ..
    }, (err) => next(err))
    .catch((err) => next(err)); //catch all errors --> http-error module. you can also print your message but in this case the module will handle it for you
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /pizzas/create');
})

.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('Delete operation not  supported on /pizzas/creste');
    
});


module.exports = pizzaRouter;