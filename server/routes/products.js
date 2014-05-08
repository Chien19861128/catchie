'use strict';

// Products routes use products controller
var products = require('../controllers/products');
var authorization = require('./middlewares/authorization');

// Product authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.product.user.account !== req.user.account) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/products', products.all);
    app.get('/products/:accountName', products.accountAll);
    app.post('/products', authorization.requiresLogin, products.create);
    app.get('/products/:accountName-:productSku-:productSimple', products.show);
    app.get('/products/:accountName-:productSku', products.skuAll);
    app.put('/products/:accountName-:productSku-:productSimple', authorization.requiresLogin, hasAuthorization, products.update);
    app.del('/products/:accountName-:productSku-:productSimple', authorization.requiresLogin, hasAuthorization, products.destroy);

    // Finish with setting up the productId param
    app.param('productId', products.product);

};