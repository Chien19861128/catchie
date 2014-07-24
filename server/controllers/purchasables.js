'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Purchasable = mongoose.model('Purchasable'),
    Account = mongoose.model('Account'),
    _ = require('lodash');


/**
 * Find purchasable by id
 */
exports.purchasable = function(req, res, next, vendorName, purchasableName) {
    var purchasableName = vendorName + '-' + purchasableName;
	
	Account
        .findOne({
		    _id: req.user._account,
        }).exec(function(err, account) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                Purchasable
                    .findOne({
                        name: purchasableName,
            			buyer: vendorName
                    })
                    .exec(function(err, purchasable) {
                        if (err) return next(err);
                        if (!purchasable) return next(new Error('Failed to load Purchasable ' + name));
			            req.purchasable = purchasable;
                        next();
                    });
            }
        });
};

/**
 * Create a purchasable
 */
exports.create = function(req, res) {
    var purchasable = new Purchasable(req.body);
    purchasable._account = req.user._account;

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
                if (account.name == simpleSplit[0] && simpleSplit.length == 2) {
				    purchasable.save(function(err) {
                        if (err) {
                            return res.send('users/signup', {
                                errors: err.errors,
                                purchasable: purchasable
                            });
                        } else {
                            res.jsonp(purchasable);
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
 * Update an purchasable
 */
exports.update = function(req, res) {
    var purchasable = req.purchasable;

    purchasable = _.extend(purchasable, req.body);

    purchasable.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                purchasable: purchasable
            });
        } else {
            res.jsonp(purchasable);
        }
    });
};

/**
 * Delete an purchasable
 */
exports.destroy = function(req, res) {
    var purchasable = req.purchasable;

    purchasable.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                purchasable: purchasable
            });
        } else {
            res.jsonp(purchasable);
        }
    });
};

/**
 * Show an purchasable
 */
exports.show = function(req, res) {
    //console.log('[show][accountName] ' + accountName);
    res.jsonp(req.purchasable);
};

/**
 * List of all Purchasables
 */
exports.all = function(req, res) {
    //console.log('[req.user._account]' + req.user._account);
	
	Account
        .findOne({
		    _id: req.user._account,
        }).exec(function(err, account) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                Purchasable
                    .find({
            			buyers: { $in : vendorName }
                    })
                    .exec(function(err, purchasables) {
                        if (err) {
                            res.render('error', {
                                status: 500
                            });
                        } else {
                            res.jsonp(purchasables);
                        }
                    });
            }
        });
};

/**
 * List of own Purchasables
 */
exports.me = function(req, res) {
    console.log('[req.user._account]' + req.user._account);
    Purchasables
	    .find({
			_account: req.user._account
		}).sort('-simple').exec(function(err, purchasables) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(purchasables);
            }
        });
};

/**
 * Add Cart Item
 */
exports.addCartItem = function(req, res) {
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
                if (account.name == simpleSplit[0] && simpleSplit.length==3) {
				    
                    Purchasable
                        .findOne({
                            name: purchasableName,
            			    buyer: vendorName
                        })
                        .exec(function(err, purchasable) {
                            if (err) return next(err);
                            if (!purchasable) return next(new Error('Failed to load Purchasable ' + name));
							
							for ( i in purchasable.cart_item ) {
							    if (cart_item[i]._simple == req.body.simple){
                                    
									purchasable.cart_item[i].quantity = purchasable.cart_item[i].quantity + req.body.quantity;
									
                                    purchasable.save(function(err) {
                                        if (err) {
                                            return res.send('users/signup', {
                                                errors: err.errors,
                                                purchasable: purchasable
                                            });
                                        } else {
                                            return res.jsonp(purchasable.cart_item);
                                        }
                                    });
                                }
							}
							
			                purchasable.cart_item
                                .push({
								    _simple: req.body.simple,
								    quantity: req.body.quantity
								}).exec(function(err, purchasable) {
                                    if (err) {
                                        res.render('error', {
                                            status: 500
                                        });
                                    } else {
                                        res.jsonp(purchasable.cart_item);
                                    }
                                });
                        });
				}
            }
        });
};


/**
 * Update Cart Items
 */
exports.updateCartItems = function(req, res) {
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
                if (account.name == simpleSplit[0] && simpleSplit.length==3) {
				    
                    Purchasable
                        .findOne({
                            name: purchasableName,
            			    buyer: vendorName
                        })
                        .exec(function(err, purchasable) {
                            if (err) return next(err);
                            if (!purchasable) return next(new Error('Failed to load Purchasable ' + name));
							
							req.body.cart_items.forEach(function (cart_item) {
							    for ( i in purchasable.cart_item ) {
							        if (cart_item[i]._simple == cart_item.simple){
									    if (cart_item.quantity == 0) {
										    purchasable.cart_item.splice(i, 1);
										} else { 
										    purchasable.cart_item[i].quantity = cart_item.quantity;
									    }
                                    }
							    }
							});
							
			                purchasable.save(function(err) {
                                if (err) {
                                    return res.send('users/signup', {
                                        errors: err.errors,
                                        purchasable: purchasable
                                    });
                                } else {
                                    return res.jsonp(purchasable.cart_item);
                                }
                            });
                        });
				}
            }
        });
};

/**
 * Calculate Cart
 */