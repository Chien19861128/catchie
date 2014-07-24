'use strict';

//Users service used for users REST endpoint
angular.module('mean.users').factory('Users', ['$resource', function($resource) {
    return $resource('users/:username', {
        //username:'@username'
    }, {
	    get: {method:'GET', params:{username:'@username'}},
	    query: {method:'GET', isArray:true},
        post: {method:'POST'},
        update: { method: 'PUT', params:{username:'@username'}},
        remove: {method:'DELETE', params:{username:'@username'}}
    });
}]);