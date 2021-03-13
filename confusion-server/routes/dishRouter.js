const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .get((req, res, next) => {
        Dishes.find({})
            .then((dishes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            })
            .catch((err) => {
                next(err);
            });
    })
    .post((req, res, next) => {
        Dishes.create(req.body)
            .then((dish) => {
                console.log('Dish Created', dish);
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported');
    })
    .delete((req, res, next) => {
        Dishes.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

dishRouter.route('/:dishId')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dishes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            })
            .catch((err) => {
                next(err);
            });
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported');
    })
    .put((req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.dishId, { $set: req.body }, { new: true })
            .then((dishes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            })
            .catch((err) => {
                next(err);
            });
    })
    .delete((req, res, next) => {
        Dishes.findByIdAndDelete(req.params.dishId)
            .then((dishes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            })
            .catch((err) => {
                next(err);
            });
    });


dishRouter.route('/:dishId/comments')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish.comments);
                } else {
                    let err = new Error('Dish is not found');
                    err.status = 404;
                    next(err);
                }
            })
            .catch((err) => {
                next(err);
            });
    })
    .post((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish) {
                    dish.comments.push(req.body);
                    dish.save()
                        .then((resp) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(dish);
                        });
                } else {
                    let err = new Error('Dish is not found');
                    err.status = 404;
                    next(err);
                }
            })
            .catch((err) => {
                next(err);
            });
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported');
    })
    .delete((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish) {
                    dish.comments = [];
                    dish.save()
                        .then((resp) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(resp);
                        })
                } else {
                    let err = new Error('Dish is not found');
                    err.status = 404;
                    next(err);
                }
            })
            .catch((err) => {
                next(err);
            });
    });

dishRouter.route('/:dishId/comments/:commentId')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish && dish.comments.id(req.params.commentId)) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish.comments.id(req.params.commentId));
                } else if (!dish) {
                    let err = new Error('dish is not found');
                    err.status = 404;
                    next(err);
                } else {
                    let err = new Error('comment is not found');
                    err.status = 404;
                    next(err);
                }
            })
            .catch((err) => {
                next(err);
            });
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported');
    })
    .put((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish && dish.comments.id(req.params.commentId)) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    if (req.body.rating) {
                        dish.comments.id(req.params.commentId).rating = req.body.rating;
                    }
                    if (req.body.comment) {
                        dish.comments.id(req.params.commentId).comment = req.body.comment;
                    }
                    dish.save()
                        .then((resp) => {
                            res.json(resp);
                        });
                } else if (!dish) {
                    let err = new Error('dish is not found');
                    err.status = 404;
                    next(err);
                } else {
                    let err = new Error('comment is not found');
                    err.status = 404;
                    next(err);
                }
            })
            .catch((err) => {
                next(err);
            });
    })
    .delete((req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                if (dish && dish.comments.id(req.params.commentId)) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    dish.comments.id(req.params.commentId).remove();
                    dish.save()
                        .then((resp) => {
                            res.json(resp);
                        });
                } else if (!dish) {
                    let err = new Error('dish is not found');
                    err.status = 404;
                    next(err);
                } else {
                    let err = new Error('comment is not found');
                    err.status = 404;
                    next(err);
                }
            })
            .catch((err) => {
                next(err);
            });
    });

module.exports.dishRouter = dishRouter;
