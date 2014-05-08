'use strict';

//Users service used for users REST endpoint
angular.module('mean.users').factory('Users', ['$resource', function($resource) {
    return $resource('users/:userId', {
        //userId:'@_id'
    }, {
	    get: {method:'GET', params:{userId:'@_id'}},
	    query: {method:'GET', isArray:true},
        post: {method:'POST'},
        update: { method: 'PUT', params:{userId:'@_id'}},
        remove: {method:'DELETE', params:{userId:'@_id'}}
    });
}]);