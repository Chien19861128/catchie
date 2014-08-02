'use strict';

var purchasables = require('../controllers/purchasables');
var authorization = require('./middlewares/authorization');

var hasAuthorization = function(req, res, next) {
	//if (req.product.user.account !== req.user.account) {
    //    return res.send(401, 'User is not authorized');
    //}
    next();
};

module.exports = function(app) {

    app.get('/purchasables/me', purchasables.me);
    app.get('/purchasables/:vendorName-:purchasableName', purchasables.show);
    //app.get('/purchasables/:vendorName-:purchasableName/cart/:username', purchasables.showCart);
    app.get('/purchasables', purchasables.all);
    app.post('/purchasables', authorization.requiresLogin, purchasables.create);
    app.put('/purchasables/:vendorName-:purchasableName', authorization.requiresLogin, hasAuthorization, purchasables.update);
    app.post('/purchasables/:vendorName-:purchasableName/cart/', authorization.requiresLogin, hasAuthorization, purchasables.addCartItem);
    app.put('/purchasables/:vendorName-:purchasableName/cart/', authorization.requiresLogin, hasAuthorization, purchasables.updateCartItems);
    //app.put('/purchasables/:vendorName-:purchasableName/checkout/:username', authorization.requiresLogin, hasAuthorization, purchasables.update);
    app.del('/purchasables/:vendorName-:purchasableName', authorization.requiresLogin, hasAuthorization, purchasables.destroy);

    // Finish with setting up the purchasableId param
    app.param('purchasableId', purchasables.purchasable);

};