const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Products = require('../models/Products');

const productRouter = express.Router();

productRouter.use(bodyParser.json());

productRouter.route('/')
.get((req,res,next) => {
    Products.find(req.query)
    .populate('category')
    .then((products) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(products);
    }, (err) => next(err))
    .catch((err) => next(err));
})
//2. Add Product mapped to a category or categories.
.post((req, res, next) => {
    Products.create(req.body)
    .then((product) => {
        console.log('Product Created ', product);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product);
    }, (err) => next(err))
    .catch((err) => next(err));
});


productRouter.route('/:paramId')
// 5. Update product details (name,price,etc)
.put((req, res, next) => {
    Products.findByIdAndUpdate(req.params.paramId, {
        $set: req.body
    }, { new: true })
    .then((product) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product);
    }, (err) => next(err))
    .catch((err) => next(err));
})
// 4. Get all products by a category.
.get((req, res, next) => {
    Products.find({category: req.params.paramId})
    .populate('category')
    .then((products) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(products);
    }, (err) => next(err))
    .catch((err) => next(err));
})


module.exports = productRouter;