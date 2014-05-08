'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    _ = require('lodash');


/**
 * Find product by id
 */
exports.product = function(req, res, next, accountName, productSku, productSimple) {
    var simple = accountName + '-' + productSku + '-' + productSimple;
    Product
        .findOne({
            simple: simple
        })
        .exec(function(err, product) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load Product ' + simple));
			req.product = product;
            next();
        });
    /*Product.load(id, function(err, product) {
        if (err) return next(err);
        if (!product) return next(new Error('Failed to load product ' + id));
        req.product = product;
        next();
    });*/
};

/**
 * Create an product
 */
exports.create = function(req, res) {
    var product = new Product(req.body);
    product._account = req.user._account;

    product.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                product: product
            });
        } else {
            res.jsonp(product);
        }
    });
};

/**
 * Update an product
 */
exports.update = function(req, res) {
    var product = req.product;

    product = _.extend(product, req.body);

    product.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                product: product
            });
        } else {
            res.jsonp(product);
        }
    });
};

/**
 * Delete an product
 */
exports.destroy = function(req, res) {
    var product = req.product;

    product.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                product: product
            });
        } else {
            res.jsonp(product);
        }
    });
};

/**
 * Show an product
 */
exports.show = function(req, res) {
    res.jsonp(req.product);
};

/**
 * List of Products
 */
exports.all = function(req, res) {
    Product.find({is_discoverable:true}).sort('-simple').exec(function(err, products) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(products);
        }
    });
};

/**
 * List of Products of a Vendor
 */
exports.accountAll = function(req, res) {
    Product//accountName
        .find({
		    simple: { $regex: '/^' + accountName + '/' },
            is_discoverable:true
        }).sort('-simple').exec(function(err, products) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(products);
            }
        });
};

/**
 * List of Products of a Sku
 */
exports.skuAll = function(req, res) {
    Product//accountName
        .find({
		    simple: { $regex: '/^' + accountName + '-' + productSku + '/' },
            is_discoverable:true
        }).sort('-simple').exec(function(err, products) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(products);
            }
        });
};
