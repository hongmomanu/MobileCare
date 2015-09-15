/**
 * Created by jack on 9/7/15.
 */
angular.module('app.services')
    .factory('broadcastService', function($http) {
        return {
            getbroadcasters: function() {

                return $http.get(socketurl+"getbroadcasters").then(function(response) {
                            return response;
                });
            }
        }
    });