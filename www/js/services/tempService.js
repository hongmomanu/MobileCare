/**
 * Created by jack on 9/7/15.
 */
angular.module('app.services')
    .factory('tempService', function($http) {
        return {
            getCaretemp: function() {

                return $http.get(serverurl+"temp/gettemp").then(function(response) {
                            return response;
                });
            },
            getCaretempByid: function(id) {

                return $http.get(serverurl+"temp/gettempbyid",{params:{id:id}}).then(function(response) {
                            return response;
                });
            }
        }
    });