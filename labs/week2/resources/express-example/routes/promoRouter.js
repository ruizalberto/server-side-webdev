const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
   
        res.end('Will send all the promotions to you!');
})

.post((req, res, next) => {
    res.end('Will send the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotion');
})
.delete((req, res, next) => {
    res.end('Deleting all promotions');
});

promoRouter.route('/:promo')
.get((req,res,next) => {
    res.end('Will send promotion '+req.params.promo+' to you!');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on promo id: '+req.params.promo);
});

module.exports = promoRouter;