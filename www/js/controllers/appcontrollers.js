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

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl(localStorage.serverurl+'templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.logout = function () {
            //$scope.modal.show();
            //alert(1);

            var confirmPopup = $ionicPopup.confirm({
                title: '提示',
                template: '你确定要退出应用么?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    //console.log('You are sure');
                    $state.go('app');
                } else {
                    //console.log('You are not sure');
                }
            });


        };

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


    })





    .controller('PlaylistCtrl', function ($scope, $stateParams, $http) {

        testobj = $http;
        console.log(22);
    });
