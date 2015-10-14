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
            },
            useradd: function(username,realname,password) {

                return $http.post(serverurl+"user/adduser",
                    { "username": username, "password": password,"realname":realname }).then(function(response) {
                            return response;
                });
            }
        }
    });