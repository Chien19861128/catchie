'use strict';

angular.module('mean.accounts').controller('AccountsController', ['$scope', '$stateParams', '$location', 'Global', 'Accounts', function ($scope, $stateParams, $location, Global, Accounts) {
    $scope.global = Global;

    $scope.create = function() {
        var account = new Accounts({
            title: this.title,
            content: this.content
        });
        accounts.$save(function(response) {
            $location.path('accounts/' + response.name);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(account) {
        if (account) {
            account.$remove();

            for (var i in $scope.accounts) {
                if ($scope.accounts[i] === account) {
                    $scope.accounts.splice(i, 1);
                }
            }
        }
        else {
            $scope.account.$remove();
            $location.path('accounts');
        }
    };

    $scope.update = function() {
        var account = $scope.account;
        if (!account.updated) {
            account.updated = [];
        }
        account.updated.push(new Date().getTime());

        account.$update(function() {
            $location.path('accounts/' + account.name);
        });
    };

    $scope.find = function() {
        Accounts.query(function(accounts) {
            $scope.accounts = accounts;
        });
    };

    $scope.findOne = function() {
        Accounts.get({
            name: $stateParams.name
        }, function(account) {
            $scope.account = account;
        });
    };

    $scope.findMe = function() {
        Accounts.get({
            name: 'me'
        }, function(account) {
            $scope.account = account;
        });
    };
}]);