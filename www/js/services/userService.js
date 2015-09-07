/**
 * Created by jack on 9/7/15.
 */
angular.module('app.services')
    .factory('userService', function($http) {
        return {
            userlogin: function(username,password) {

                return $http.get("http://127.0.0.1:3000/user/login",
                    { params:{ "username": username, "password": password } }).then(function(response) {
                            return response;
                });
            }
        }
    });