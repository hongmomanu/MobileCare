angular.module('starter.controllers', [])

    .controller('videoCtrl', function ($scope,$rootScope,$timeout) {
        console.log('videoCtrl');
        //var last=false;
        var exArray = []; //存储设备源ID

        var makebroadcast=function(){

        };

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



                var callback=function(timeno){
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
                                    'username':localStorage.username,
                                    'adata':audioRecorder.getBlob()
                                });
                                if(!last)callback(10000);
                            })
                            //mediaElement.src = videoURL; //plays the recorded blob url on that src


                        });
                    }, timeno);

                }
                callback(0);



            }

            function onMediaError(e) {
                console.error('media error', e);
            }

        });

    });
