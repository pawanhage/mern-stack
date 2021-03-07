const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Get all promotions');
    })
    .post((req, res, next) => {
        res.end('will add the promotions: ' + req.body.name + req.body.description);
    })
    .put((req, res, next) => {
        res.end('Put operation now allowed');
    })
    .delete((req, res, next) => {
        res.end('Delete all promotions');
    });

promoRouter.route('/:promoId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Get promo ' + req.params.promoId);
    })
    .post((req, res, next) => {
        res.end('Post operation not allowed');
    })
    .put((req, res, next) => {
        res.end('Update promotion ' + req.params.promoId);
    })
    .delete((req, res, next) => {
        res.end('Delete promotion ' + req.params.promoId);
    });

module.exports = promoRouter;
