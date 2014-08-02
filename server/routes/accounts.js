'use strict';

// User routes use accounts controller
var accounts = require('../controllers/accounts');
var authorization = require('./middlewares/authorization');

// Account authorization helpers
//var hasAuthorization = function(req, res, next) {
//	if (req.account._id !== req.user.account || 'Admin' !== req.user.name) {
//        return res.send(401, 'User is not authorized');
//    }
//    next();
//};

module.exports = function(app) {
//module.exports = function(app, passport) {

    //app.get('/logout', accounts.signout);
    app.get('/accounts/me', accounts.me);

    // Setting up the accounts api
    app.post('/register', accounts.create);
    
    app.put('/accounts/:accountName', authorization.requiresLogin, accounts.update);

    // Setting up the accountId param
    app.param('accountName', accounts.account);

    // AngularJS route to check for authentication
    //app.get('/loggedin', function(req, res) {
    //    res.send(req.isAuthenticated() ? req.user.name : '0');
    //});

    // Setting the local strategy route
    /*app.post('/login', passport.authenticate('local', {
        failureFlash: true
    }), function (req,res) {
        res.send(req.user.name);
    });
    */

};
