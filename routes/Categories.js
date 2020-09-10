const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Categories = require('../models/Categories');

const categoryRouter = express.Router();

categoryRouter.use(bodyParser.json());

categoryRouter.route('/')
// Get all categories with all its child categories mapped to it. Note : Each
// category object should look something like this {Id : 1 , child_categories:
// [], ...}
.get((req,res,next) => {
    Categories.find(req.query)
    .populate('subcategories')
    .then((categories) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(categories);
    }, (err) => next(err))
    .catch((err) => next(err));
})
//1. 1. Add a category
.post((req, res, next) => {
    Categories.create(req.body)
    .then((category) => {
        console.log('category Created ', category);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(category);
    }, (err) => next(err))
    .catch((err) => next(err));
})

categoryRouter.route('/:cateId/subcategories')
.get((req,res,next) => {
    Categories.findById(req.params.cateId)
    .populate('subcategories')
    .then((category) => {
        if (category != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(category.subcategories);
        }
        else {
            err = new Error('Category ' + req.params.cateId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Categories.findById(req.params.cateId)
    .then((category) => {
        if (category != null) {
            category.subcategories.push(req.body);
            category.save()
            .then((category) => {
                Categories.findById(category._id)
                .populate('subcategories')
                .then((category) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(category);
                })            
            }, (err) => next(err));
        }
        else {
            err = new Error('Category ' + req.params.cateId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})


module.exports = categoryRouter;