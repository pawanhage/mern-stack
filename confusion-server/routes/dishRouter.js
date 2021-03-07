const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the dishes to you');
    })
    .post((req, res, next) => {
        res.end('will add the dish: ' + req.body.name + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported');
    })
    .delete((req, res, next) => {
        res.end('Delete operation');
    });

dishRouter.route('/:dishId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send dish details to you' + req.params.dishId);
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported');
    })
    .put((req, res, next) => {
        res.write('Updating the dish ' + req.params.dishId);
        res.end('Will update the dish details ' + req.params.dishId + req.body.name + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting dish ' + req.params.dishId);
    });

module.exports.dishRouter = dishRouter;
