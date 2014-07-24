'use strict';

angular.module('mean.products').controller('ProductsController', ['$scope', '$stateParams', '$location', 'Global', 'Products', 'Accounts', function ($scope, $stateParams, $location, Global, Products, Accounts) {
    $scope.global = Global;

    Accounts.get({
        name: 'me'
    }, function(account) {
	    console.log(account);
        $scope.account = account;
    });

    $scope.create = function() {
		
        var product = new Products({	
            _account: this._account,
            simple: this.simple,
            name: this.name,
            category: this.category,
            currency: this.currency,
            original_price: this.original_price,
            special_price: this.special_price,
            price: this.price,
            description: this.description,
            is_show_price: this.is_show_price,
            is_discoverable: this.is_discoverable,
            custom_fields: this.custom_fields,
            created: this.created
        });
        product.$save(function(response) {
            $location.path('products/' + response.simple);
        });

        this._account = '';
        this.simple = '';
        this.name = '';
        this.category = '';
        this.currency = '';
        this.original_price = '';
        this.special_price = '';
        this.price = '';
        this.description = '';
        this.is_show_price = '';
        this.is_discoverable = '';
        this.custom_fields = '';
        this.created = '';
    };

    $scope.remove = function(product) {
        if (product) {
            product.$remove();

            for (var i in $scope.products) {
                if ($scope.products[i] === product) {
                    $scope.products.splice(i, 1);
                }
            }
        }
        else {
            $scope.product.$remove();
            $location.path('products');
        }
    };

    $scope.update = function() {
        var product = $scope.product;
        if (!product.updated) {
            product.updated = [];
        }
        product.updated.push(new Date().getTime());

        product.$update(function() {
            $location.path('products/' + product.simple);
        });
    };

    $scope.find = function() {
        Products.getMe(function(products) {
            $scope.products = products;
        });
        //Products.query(function(products) {
        //    $scope.products = products;
        //});
    };

    $scope.findOne = function() {
        Products.get({
            simple: $stateParams.simple
        }, function(product) {
            $scope.product = product;
        });
    };
}]);