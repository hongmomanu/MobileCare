angular.module('main.newcarecontroller', [])

    .controller('NewCareCtrl', function ($scope, $ionicModal, $timeout, $state, $ionicPopup,$rootScope) {

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
    .controller('ChooseTempCtrl', function ($scope, $stateParams, $http, $ionicLoading, tempService, $rootScope) {
        console.log($stateParams);

        $rootScope.$on('tempinit', function (event, otherscope) {
            otherscope.carerecord = $stateParams;
        });

        tempService.getCaretemp().then(function (response) {
            $scope.caretemplists = response.data;
        });

    })
    .controller('CaretemplistCtrl', function ($scope, $stateParams, $http, $ionicLoading, tempService, $rootScope) {

        testobj = $http;
        console.log($stateParams);
        tempService.getCaretempByid($stateParams.sigleId).then(function (response) {
            $scope.devList = response.data.content;
        });
        $rootScope.$broadcast('tempinit', $scope);


    }).controller('CaredetailsCtrl', function ($scope, tempService) {


        tempService.getRecordByPage(1, 10).then(function (response) {
            $scope.caredetails = response.data;
        });

        $scope.doRefresh = function () {
            //alert(1);
            tempService.getRecordByPage(1, 10).then(function (response) {
                $scope.caredetails = response.data;
                $scope.$broadcast("scroll.refreshComplete");
            });
        };


    })

    .controller('CaredetailCtrl', function ($scope, $ionicModal,$stateParams, tempService, $state, $ionicPopup, $ionicLoading) {


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

        //testobj=$http;

        $scope.playvideo = function () {
            //alert(11);
            $ionicModal.fromTemplateUrl('templates/videomodel.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.videomodal = modal;
                $scope.videomodal.show();
            });

        };
        $scope.closemodel = function () {

            $scope.videomodal.hide();

        };
        $scope.saverecord = function () {

            var data = angular.copy($scope.savedata);
            delete  data._id;
            delete data.time;
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
                        console.log($scope.devList);
                        console.log($scope.carerecord);
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









