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
            },
            getRecordByPage: function(page,limit) {

                return $http.get(serverurl+"temp/getrecord",
                    {params:{page:page,limit:limit}}).then(function(response) {
                            return response;
                });
            },
            getRecordById: function(id) {

                return $http.get(serverurl+"temp/getrecordbyid",
                    {params:{id:id}}).then(function(response) {
                            return response;
                });
            },
            getRecordByKey:function(key){
                return $http.get(serverurl+"temp/getrecordbykey",
                    {params:{key:key}}).then(function(response) {
                        return response;
                    });
            },
            addnewRecord: function(item) {

                return $http.post(serverurl+"temp/addrecord",
                    {params:item}).then(function(response) {
                            return response;
                });
            },
            saveRecordById:function(id,content){

                return $http.post(serverurl+"temp/saverecord",
                    {id:id,content:content}).then(function(response) {
                        return response;
                    });
            }
        }
    });