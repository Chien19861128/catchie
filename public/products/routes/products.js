'use strict';

//Setting up route
angular.module('mean.products').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        //================================================
        // Check if the user is connected
        //================================================
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0')
                    $timeout(deferred.resolve, 0);

                // Not Authenticated
                else {
                    $timeout(function() {
                        deferred.reject();
                    }, 0);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };
        //================================================
        // Check if the user is not conntect
        //================================================
        var checkLoggedOut = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') {
                    $timeout(function() {
                        deferred.reject();
                    }, 0);
                    $location.url('/login');

                }

                // Not Authenticated
                else {
                    $timeout(deferred.resolve, 0);

                }
            });

            return deferred.promise;
        };
        //================================================


        // states for my app
        $stateProvider
            .state('all products', {
                url: '/products/me',
                templateUrl: 'public/products/views/list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('create product', {
                url: '/products/create',
                templateUrl: 'public/products/views/create.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('edit product', {
                url: '/products/:simple/edit',
                templateUrl: 'public/products/views/edit.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('product by id', {
                url: '/products/:simple',
                templateUrl: 'public/products/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('discover', {
                url: '/discover',
                templateUrl: 'public/products/views/discover-list.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
    }
])