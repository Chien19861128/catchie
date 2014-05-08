'use strict';

// Product defaults routes use products controller
var productDefaults = require('../controllers/product_defaults');
var authorization = require('./middlewares/authorization');

// Product authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.productDefaults.user.account !== req.user.account) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/products/default', productDefaults.all);
    app.post('/products/:accountName-:productSku/default', authorization.requiresLogin, productDefaults.create);
    app.get('/products/:accountName-:productSku/default', productDefaults.show);
    app.put('/products/:accountName-:productSku/default', authorization.requiresLogin, hasAuthorization, productDefaults.update);
    app.del('/products/:accountName-:productSku/default', authorization.requiresLogin, hasAuthorization, productDefaults.destroy);

    // Finish with setting up the productId param
    app.param('productDefaultId', productDefaults.productDefault);

};