angular.module('app.controllers')

    .controller('AppCtrl', function ($scope, $ionicModal,$ionicLoading, $timeout, $state, $ionicPopup, userService) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.user = {username:localStorage.username,
            password:localStorage.password,
            realname:localStorage.realname
        };
        //$scope.newuser={};

        // Create the login modal that we will use later
        /*$ionicModal.fromTemplateUrl(localStorage.serverurl+'templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };*/

        // Open the login modal


        // Perform the login action when the user submits the login form
        $scope.signIn = function () {
            $ionicLoading.show({template: '登录中...',duration: 5000});
            userService.userlogin($scope.user.username, $scope.user.password).then(function (response) {
                $ionicLoading.hide();
                if (response.data.success) {
                    localStorage.username=response.data.user.username;
                    localStorage.password=response.data.user.password;
                    localStorage.realname=response.data.user.realname;
                    $state.go('index.search');
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: '登录提示',
                        template: '用户名或密码错误'
                    });
                    alertPopup.then(function (res) {
                        //console.log(res);
                    });
                }
            });


        };
        $scope.signIn();

        $scope.newUser=function(){
            $ionicModal.fromTemplateUrl(localStorage.serverurl+'templates/registermodel.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.reg_modal = modal;
                $scope.reg_modal.show();
            });
        };

        $scope.cancel_reg=function(){

           $scope.reg_modal.hide();

        };
        $scope.register=function(user){

            //alert(1);
            //console.log(newuser);

            if(!user.username){
                $ionicLoading.show({template: '用户名不能为空',duration: 1500});
                return;
            }
            if(!user.realname){
                $ionicLoading.show({template: '姓名不能为空',duration: 1500});
                return;
            }
            if(!user.password){
                $ionicLoading.show({template: '密码不能为空',duration: 1500});
                return;
            }
            if(user.password!=user.repassword){
                $ionicLoading.show({template: '密码输入不一致',duration: 1500});
                return;
            }

            $ionicLoading.show({template: '注册中...',duration: 5000});
            userService.useradd(user.username,user.realname,user.password).then(function (response) {
                $ionicLoading.hide();
                if (response.data.success) {
                    $scope.reg_modal.hide();
                    localStorage.username=user.username;
                    localStorage.password=user.password;
                    localStorage.realname=user.realname;
                    $state.go('index.search');
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: '注册提示',
                        template: response.data.message
                    });
                    alertPopup.then(function (res) {
                        //console.log(res);
                    });
                }
            });



        };




    })





    .controller('PlaylistCtrl', function ($scope, $stateParams, $http) {

        testobj = $http;
        console.log(22);
    });
