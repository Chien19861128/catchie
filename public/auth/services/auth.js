'use strict';

//Users service used for users REST endpoint
angular.module('mean.auth').factory('AuthService', function() {
    
    var currentUser;

    return {
        setCurrentUser: function(logginUser) { currentUser = logginUser; },
        getCurrentUser: function() { return currentUser; }
    };
});