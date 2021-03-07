const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Get all leaders');
    })
    .post((req, res, next) => {
        res.end('will add the leader: ' + req.body.name + req.body.description);
    })
    .put((req, res, next) => {
        res.end('Put operation now allowed');
    })
    .delete((req, res, next) => {
        res.end('Delete all leaders');
    });

leaderRouter.route('/:leaderId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Get leader ' + req.params.leaderId);
    })
    .post((req, res, next) => {
        res.end('Post operation not allowed');
    })
    .put((req, res, next) => {
        res.end('Update leaders ' + req.params.leaderId);
    })
    .delete((req, res, next) => {
        res.end('Delete leaders ' + req.params.leaderId);
    });

module.exports = leaderRouter;
