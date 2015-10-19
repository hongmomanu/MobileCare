angular.module('app.controllers')

    .controller('NewCareCtrl', function ($scope, $ionicModal, $timeout, $state, $ionicPopup,$rootScope) {


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


        $scope.newcarenocardnext = function (user) {

            console.log(user);
            $state.go('index.selecttemp', user);

        };

        $scope.newcarecardnext = function (user) {
            console.log(user);
            //alert(11);
            $state.go('index.selecttemp', user);
            //$state.go('index.choosetemp');
        };

        $scope.demo = 'nocard';
        $scope.newCare = function (p) {
            $rootScope.$broadcast('startrecording');
            /*$timeout(function(){
                $rootScope.$broadcast('stoprecording');
            },60000);*/
            document.body.classList.remove('platform-card');
            document.body.classList.remove('platform-nocard');
            document.body.classList.add('platform-' + p);
            $scope.demo = p;
            if (p == 'nocard') {
                $state.go('index.newcareunknwon');
            } else {
                $state.go('index.newcarewithcard');
            }
        }


    })
    .controller('RemotecaringsCtrl', function ($scope, $stateParams, $http, $ionicLoading, broadcastService, $rootScope) {
        console.log("RemotecaringsCtrl");
        $ionicLoading.show({template: '加载最新急救', duration: 10000});
        broadcastService.getbroadcasters().then(function (response) {
            if(response.data.length==0||document.getElementById('rooms-list').childElementCount>0)$ionicLoading.hide();
            $scope.remotecarings = response.data;

        });
        $scope.doRefresh = function () {
            //alert(1);
            broadcastService.getbroadcasters().then(function (response) {
                $scope.remotecarings = response.data;
                $scope.$broadcast("scroll.refreshComplete");
            });
        };

    })

    .controller('RemotecaringCtrl', function ($scope, $stateParams, $http, $ionicLoading, tempService, $rootScope) {
        console.log("RemotecaringCtrl");
        $scope.usernmae=$stateParams.username;
        $scope.realname=$stateParams.realname;

        $rootScope.$broadcast('joinroomclick',$stateParams.username);
        /*var participants = document.getElementById("videodivwrap");
        $('#remotecaringvideo')[0].src=participants.children[0].src;*/

        $scope.$on('$ionicView.leave', function(){
            console.log("hahaha");
            $rootScope.$broadcast('remoteleaved');
            // do all kind of stuff
        });
        console.log($stateParams);
    })
    .controller('ChooseTempCtrl', function ($scope, $stateParams, $http, $ionicLoading, tempService, $rootScope) {
        console.log("ChooseTempCtrl");

        $rootScope.$on('tempinit', function (event, otherscope) {
            otherscope.carerecord = $stateParams;
        });

        tempService.getCaretemp().then(function (response) {
            $scope.caretemplists = response.data;
        });

    })
    .controller('CaretemplistCtrl', function ($scope, $stateParams, $http, $ionicLoading, tempService, $rootScope) {


        tempService.getCaretempByid($stateParams.sigleId).then(function (response) {
            $scope.devList = response.data.content;
        });
        $rootScope.$broadcast('tempinit', $scope);


    }).controller('CaredetailsCtrl', function ($scope, tempService) {


        tempService.getRecordByPage(1, 10).then(function (response) {
            $scope.caredetails = response.data;
        });
        //$scope.searchkey="";

        $scope.doRefresh = function () {
            tempService.getRecordByPage(1, 10).then(function (response) {
                $scope.caredetails = response.data;
                $scope.$broadcast("scroll.refreshComplete");
            });
        };
        $scope.doSearch=function(searchkey){
            tempService.getRecordByKey(searchkey).then(function (response) {
                $scope.caredetails = response.data;
            });

        };


    })

    .controller('CaredetailCtrl', function ($sce,$scope, $rootScope,$ionicModal,$stateParams, tempService, $state, $ionicPopup, $ionicLoading) {


        $scope.clientSideList = [
            {text: "主体", value: "主体"},
            {text: "客体", value: "客体"}
        ];
        tempService.getRecordById($stateParams.caredetailId).then(function (response) {
            $scope.savedata = response.data;
            /*$scope.devList=response.data.tempcontent;
             $scope.caredetail=response.data.caredetail;*/
            if (!$scope.savedata.caredetail.clientSide)$scope.savedata.caredetail.clientSide = '主体'

        });


        $scope.playvideosrc="";
        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(staticurl+src+'/web.webm');
        }

        $scope.playvideo = function (url) {
            //alert(11);
            //alert(socketurl+url+'/web.webm');
            //VideoPlayer.play(socketurl+url+'/web.webm');
            $scope.playvideosrc=url;
            if(!$scope.videomodal){
                $ionicModal.fromTemplateUrl(localStorage.serverurl+'templates/videomodel.html', {
                    scope: $scope
                }).then(function (modal) {
                    $scope.videomodal = modal;
                    $scope.videomodal.show();
                });
            }else{
                $scope.videomodal.show();
            }


        };
        $scope.closemodel = function () {

            $('#recordingvideo')[0].pause();
            $scope.videomodal.hide();

        };
        $scope.saverecord = function () {

            $ionicPopup.confirm({
                title: '急救档案提示',
                template: '确定保存此次急救档案么?'
            }).then(function(res) {
                if(res) {
                    $rootScope.$broadcast('stoprecording');

                    var data = angular.copy($scope.savedata);
                    delete  data._id;
                    delete data.time;
                    if(!data.videosrc)data.videosrc=videosrc;

                    tempService.saveRecordById($stateParams.caredetailId, data).then(function (response) {
                        if (response.data.success) {
                            //$state.go('index.caredetails');
                            $ionicLoading.show({template: '表单保存完毕', duration: 1500});
                        } else {
                            var alertPopup = $ionicPopup.alert({
                                title: '错误提示',
                                template: '提交数据失败'
                            });
                        }

                    });

                } else {
                    //console.log('You are not sure');
                }
            });



        };

    })
    .directive('formManager', function ($ionicLoading) {
        return {
            restrict: 'A',
            controller: function ($scope, $state, $ionicHistory, $ionicPopup, tempService) {

                $scope.$watch('newCareForm.$valid', function () {
                    console.log("Form validity changed. Now : " + $scope.newCareForm.$valid);
                });

                $scope.savecare = function () {

                    if ($scope.newCareForm.$valid) {
                        //$scope.finalSubmit();
                        //alert(1)

                        $ionicLoading.show({template: '数据提交中...'});
                        $scope.carerecord['tempcontent'] = $scope.devList;
                        $scope.carerecord['caredetail'] = {};
                        //$scope.carerecord['time']=new Date();
                        tempService.addnewRecord($scope.carerecord).then(function (response) {
                            $ionicLoading.hide();
                            if (response.data.success) {
                                $ionicHistory.nextViewOptions({
                                    disableBack: true
                                });
                                $state.go('index.singlecare', {caredetailId: response.data.id})
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    title: '错误提示',
                                    template: '提交数据失败'
                                });
                            }
                        });

                    } else {
                        $ionicLoading.show({template: '表单未填写完毕', duration: 1500})
                    }


                }
            }
        }
    })
    .directive('textarea', function () {
        return {
            restrict: 'E',
            link: function (scope, element, attr) {
                var update = function () {
                    element.css("height", "auto");
                    var height = element[0].scrollHeight;
                    element.css("height", element[0].scrollHeight + "px");
                };
                scope.$watch(attr.ngModel, function () {
                    update();
                });
            }
        };
    });









