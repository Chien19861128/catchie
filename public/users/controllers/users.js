'use strict';

angular.module('mean.users').controller('UsersController', ['$scope', '$stateParams', '$location', 'Global', 'Users', function ($scope, $stateParams, $location, Global, Users) {
    $scope.global = Global;

    $scope.create = function() {
    	console.log('[this.username]'+this.username);
        var user = new Users({
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
            username: this.username,
            name: this.name
        });
    	console.log('[user]'+user);
        user.$save(function(response) {
    	console.log('[response]'+response);
            $location.path('users/' + response.username);
            //$location.path('users/');
        });

        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.username = '';
        this.name = '';
    };

    $scope.remove = function(user) {
        if (user) {
            user.$remove();

            for (var i in $scope.users) {
                if ($scope.users[i] === user) {
                    $scope.users.splice(i, 1);
                }
            }
        }
        else {
            $scope.user.$remove();
            $location.path('users');
        }
    };

    $scope.update = function() {
        var user = $scope.user;
        if (!user.updated) {
            user.updated = [];
        }
        user.updated.push(new Date().getTime());

        user.$update(function() {
            $location.path('users');
        });
    };

    $scope.find = function() {
        Users.query(function(users) {
		    console.log('[users]' + users);
            $scope.users = users;
        });
    };

    $scope.findOne = function() {
	    console.log('[$stateParams.email]' + $stateParams.email);
	    console.log('[$stateParams.username]' + $stateParams.username);
	    console.log('[$stateParams]' + $stateParams);
        Users.get({
            userId: $stateParams.userId
        }, function(user) {
	    console.log('[user.username]' + user.username);
            $scope.user = user;
        });
    };
}]);