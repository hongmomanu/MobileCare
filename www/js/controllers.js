angular.module('starter.controllers', [])

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



    .controller('videoCtrl', function ($scope,$rootScope,$timeout) {
        console.log('videoCtrl');
        //var last=false;
        var exArray = []; //存储设备源ID
        MediaStreamTrack.getSources(function (sourceInfos) {
            for (var i = 0; i != sourceInfos.length; ++i) {
                var sourceInfo = sourceInfos[i];
                //这里会遍历audio,video，所以要加以区分
                if (sourceInfo.kind == 'video') {
                    exArray.push(sourceInfo.id);
                }
            }

        });
        $rootScope.$on('stoprecording', function (event) {
            last=true;
        });
        $rootScope.$on('startrecording', function (event) {
            if(!last)return;
            last=false;
            console.log('startrecording');
            $('#videodivwrap').show('slow');


            var mediaConstraints = {
                audio: true,
                //video: true
                video: {
                    'optional': [{
                        'sourceId': exArray[1] //0为前置摄像头，1为后置
                    }]
                }

            };

            var videoRecorder=null;
            var audioRecorder=null;
            var mediaStream=null;

            var socket = io(socketurl);
            socket.on('finished', function (data) {
                if(mediaStream) mediaStream.stop();
                last=true;
                $('#videodivwrap').hide('slow');
            })
            socket.on('connected', function (data) {
                //console.log(data);
                videosrc=data.path;

            });


            /*$timeout(function () {
                last=true;

            }, 60000);*/

            navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);

            var options = {
                type: 'video'
            };

            function onMediaSuccess(stream) {
                mediaStream=stream

                var video=$('#videodivwrap').find('video')[0];
                video.src=URL.createObjectURL(stream);
                //alert(video);
                video.play();

                var callback=function(){
                    videoRecorder = RecordRTC(stream,options);
                    audioRecorder = RecordRTC(stream);
                    videoRecorder.startRecording();
                    audioRecorder.startRecording();
                    $timeout(function () {
                        audioRecorder.stopRecording(function() {
                            videoRecorder.stopRecording(function(){
                                //alert(last);
                                socket.emit('stream', {'last':last,
                                    'vdata':videoRecorder.getBlob(),
                                    'realname':localStorage.realname,
                                    'adata':audioRecorder.getBlob()
                                });
                                if(!last)callback();
                            })
                            //mediaElement.src = videoURL; //plays the recorded blob url on that src


                        });
                    }, 10000);

                }
                callback();



            }

            function onMediaError(e) {
                console.error('media error', e);
            }

        });

    })

    .controller('PlaylistCtrl', function ($scope, $stateParams, $http) {

        testobj = $http;
        console.log(22);
    });
