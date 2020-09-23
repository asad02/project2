const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.get_product_all = (req, res, next) => {
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    productImage: doc.productImage,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
    });
};

exports.create_a_product = (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Created product successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    productImage: result.productImage,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err});
        });
};

exports.get_a_product = (req, res, next) => {
    const id = req.params.productId;

    Product.findById(id)
        .select('name price _id productImage')
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    product: {
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        _id: doc._id
                    },
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/' + doc._id
                    }
                });
            } else {
                res.status(404).json({message: 'Not Found'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.update_a_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });;
};

exports.delete_a_product = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({
        _id: id
    }).exec()
    .then(result => {
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
};

exports.delete_all_product = (req, res, next) => {
    Product.find()
    .exec()
    .then(docs => {
        for (const doc of docs) {
            Product.remove({
                _id: doc._id
            }).exec()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err})
            });
        }
    })
    .catch(err => {
        console.log(err);
    });
};