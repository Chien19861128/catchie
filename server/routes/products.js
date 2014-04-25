'use strict';

// Products routes use products controller
var products = require('../controllers/products');
var authorization = require('./middlewares/authorization');

// Product authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.product.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/products', products.all);
    app.post('/products', authorization.requiresLogin, products.create);
    app.get('/products/:productId', products.show);
    app.put('/products/:productId', authorization.requiresLogin, hasAuthorization, products.update);
    app.del('/products/:productId', authorization.requiresLogin, hasAuthorization, products.destroy);

    // Finish with setting up the productId param
    app.param('productId', products.product);

};