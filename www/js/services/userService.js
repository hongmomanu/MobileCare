/**
 * Created by jack on 9/7/15.
 */
angular.module('app.services')
    .factory('userService', function($http) {
        return {
            userlogin: function(username,password) {

                return $http.get(serverurl+"user/login",
                    { params:{ "username": username, "password": password } }).then(function(response) {
                            return response;
                });
            }
        }
    });