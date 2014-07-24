'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    Account = mongoose.model('Account'),
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
            if (!product) return next(new Error('Failed to load Product ' + simple));
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
 * Create a product
 */
exports.create = function(req, res) {
    var product = new Product(req.body);
    product._account = req.user._account;

	Account
        .findOne({
		    _id: req.user._account,
        }).exec(function(err, account) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
			    var simpleSplit = req.body.simple.split("-");
                if (account.name == simpleSplit[0] && simpleSplit.length==3) {
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
				} else {
                    res.render('error', {
                        status: 500
                    });
				}
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
    console.log('[show][accountName] ' + accountName);
    res.jsonp(req.product);
};

/**
 * List of all discoverable Products
 */
exports.all = function(req, res) {
    console.log('[req.user._account]' + req.user._account);
    Product
	    .find({
		    is_discoverable:true,
			_account: {$ne: req.user._account}
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
 * List of own Products
 */
exports.me = function(req, res) {
    console.log('[req.user._account]' + req.user._account);
    Product
	    .find({
			_account: req.user._account
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
 * List of Products of a Vendor
 */
exports.accountAll = function(req, res) {
    console.log('[accountAll][accountName] ' + req.params.productSimple);
	
	Account
        .findOne({
		    _id: req.user._account,
        }).exec(function(err, account) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
			    var queryString;
				
			    var simpleSplit = req.params.productSimple.split("-");
                if (account.name == simpleSplit[0]) {
				    queryString = {
		                              simple: new RegExp('^'+req.params.productSimple),
                                      is_discoverable: true
                                  };
				} else {
				    queryString = {
		                              simple: new RegExp('^'+req.params.productSimple)
                                  };
				}
				
				if (simpleSplit.length==3) {
                    Product
                        .findOne(queryString).sort('-simple').exec(function(err, product) {
                            if (err) {
                                res.render('error', {
                                    status: 500
                                });
                            } else {
                                res.jsonp(product);
                            }
                        });
				} else {
                    Product
                        .find(queryString).sort('-simple').exec(function(err, products) {
                            if (err) {
                                res.render('error', {
                                    status: 500
                                });
                            } else {
                                res.jsonp(products);
                            }
                        });
				}
            }
        });
};