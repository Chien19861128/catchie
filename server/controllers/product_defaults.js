'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    ProductDefault = mongoose.model('ProductDefault'),
    _ = require('lodash');


/**
 * Find product default by id
 */
exports.productDefault = function(req, res, next, accountName, productSku) {
    var sku = accountName + '-' + productSku;
    ProductDefault
        .findOne({
            sku: sku
        })
        .exec(function(err, productDefault) {
            if (err) return next(err);
            if (!productDefault) return next(new Error('Failed to load Product Default ' + sku));
			req.productDefault = productDefault;
            next();
        });
    /*ProductDefault.load(id, function(err, productDefault) {
        if (err) return next(err);
        if (!productDefault) return next(new Error('Failed to load product default ' + id));
        req.productDefault = productDefault;
        next();
    });*/
};

/**
 * Create an product default
 */
exports.create = function(req, res) {
    var productDefault = new ProductDefault(req.body);
    productDefault._account = req.user._account;

    productDefault.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                productDefault: productDefault
            });
        } else {
            res.jsonp(productDefault);
        }
    });
};

/**
 * Update an product default
 */
exports.update = function(req, res) {
    var productDefault = req.productDefault;

    productDefault = _.extend(productDefault, req.body);

    productDefault.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                productDefault: productDefault
            });
        } else {
            res.jsonp(productDefault);
        }
    });
};

/**
 * Delete an product default
 */
exports.destroy = function(req, res) {
    var productDefault = req.productDefault;

    productDefault.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                productDefault: productDefault
            });
        } else {
            res.jsonp(productDefault);
        }
    });
};

/**
 * Show an product default
 */
exports.show = function(req, res) {
    res.jsonp(req.productDefault);
};

/**
 * List of Product defaults
 */
exports.all = function(req, res) {
	  console.log('[req.account] ' + req.account);
    ProductDefault.find({account: req.account}).sort('-sku').exec(function(err, productDefaults) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(productDefaults);
        }
    });
};
