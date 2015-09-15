angular.module('app.controllers')

    .controller('videoCtrl', function ($scope,$rootScope,$timeout) {
        console.log('videoCtrl');
        //var last=false;
        var exArray = []; //存储设备源ID


        var makebroadcast=function(){
            var config = {
                openSocket: function(config) {


                    console.log('openSocket')
                    var SIGNALING_SERVER = broadcasturl;

                    config.channel = config.channel || location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');
                    var sender = Math.round(Math.random() * 999999999) + 999999999;

                    ioold.connect(SIGNALING_SERVER).emit('new-channel', {
                        channel: config.channel,
                        sender: sender
                    });

                    var socket = ioold.connect(SIGNALING_SERVER + config.channel);
                    socket.channel = config.channel;
                    socket.on('connect', function () {
                        if (config.callback) config.callback(socket);
                    });

                    socket.send = function (message) {
                        socket.emit('message', {
                            sender: sender,
                            data: message
                        });
                    };

                    socket.on('message', config.onmessage);


                },
                onRemoteStream: function(media) {
                    var video = media.video;
                    console.log("remote");
                    //console.log(video);
                    console.log(media);
                    video.setAttribute('controls', true);

                    if(participants.childElementCount>0)video.style.display='none';
                    //alert()
                    participants.insertBefore(video, participants.firstChild);
                    //$(video).hide();
                    testobj=participants;
                    console.log(participants);

                    video.play();
                    //rotateVideo(video);
                },
                onRoomFound: function(room) {

                    //alert(111);
                    //console.log(room);
                    var alreadyExist = document.getElementById(room.broadcaster);
                    if (alreadyExist) return;

                    if (typeof roomsList === 'undefined') roomsList = document.body;

                    var tr = document.createElement('tr');
                    tr.setAttribute('id', room.broadcaster);
                    tr.innerHTML = '<td>' + room.roomName + '</td>' +
                    '<td><button class="join" id="' + room.roomToken + '">Join Room</button></td>';
                    roomsList.insertBefore(tr, roomsList.firstChild);

                    tr.onclick = function() {
                        tr = this;
                        //captureUserMedia(function() {
                        captureUserMediaWithOutView(function() {
                            broadcastUI.joinRoom({
                                roomToken: tr.querySelector('.join').id,
                                joinUser: tr.id
                            });

                        });
                        hideUnnecessaryStuff();
                    };
                }
            };

            function createButtonClickHandler(name) {
                captureUserMedia(function() {
                    broadcastUI.createRoom({
                        roomName:name
                    });
                });
                hideUnnecessaryStuff();
            }

            function captureUserMediaWithOutView(callback){
                /*var video = document.createElement('video');
                 video.setAttribute('autoplay', true);
                 video.setAttribute('controls', true);
                 participants.insertBefore(video, participants.firstChild);*/
                getUserMedia({
                    //video: video,
                    constraints :{
                        audio: true,
                        video: true
                    },
                    onsuccess: function(stream) {
                        config.attachStream = stream;
                        callback && callback();

                        /*video.setAttribute('muted', true);
                         rotateVideo(video);*/
                    },
                    onerror: function() {
                        alert('unable to get access to your webcam.');
                        callback && callback();
                    }
                });

            }

            function captureUserMedia(callback) {
                var video = document.createElement('video');
                video.setAttribute('autoplay', true);
                video.setAttribute('controls', true);
                if(participants.childElementCount>0)video.style.display='none';
                participants.insertBefore(video, participants.firstChild);

                getUserMedia({
                    video: video,
                    onsuccess: function(stream) {
                        config.attachStream = stream;
                        callback && callback();

                        video.setAttribute('muted', true);
                        rotateVideo(video);
                    },
                    onerror: function() {
                        alert('unable to get access to your webcam.');
                        callback && callback();
                    }
                });
            }

            /* on page load: get public rooms */
            var broadcastUI = broadcast(config);

            /* UI specific */
            var participants = document.getElementById("videodivwrap") || document.body;
            //var startConferencing = document.getElementById('start-conferencing');
            var roomsList = document.getElementById('rooms-list');

            //if (startConferencing) startConferencing.onclick = createButtonClickHandler;
            createButtonClickHandler(localStorage.username);

            function hideUnnecessaryStuff() {
                var visibleElements = document.getElementsByClassName('visible'),
                    length = visibleElements.length;
                for (var i = 0; i < length; i++) {
                    visibleElements[i].style.display = 'none';
                }
            }

            function rotateVideo(video) {
                video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(0deg)';
                setTimeout(function() {
                    video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(360deg)';
                }, 1000);
            }

            (function() {
                var uniqueToken = document.getElementById('unique-token');
                if (uniqueToken)
                    if (location.hash.length > 2) uniqueToken.parentNode.parentNode.parentNode.innerHTML = '<h2 style="text-align:center;"><a href="' + location.href + '" target="_blank">Share this link</a></h2>';
                    else uniqueToken.innerHTML = uniqueToken.parentNode.parentNode.href = '#' + (Math.random() * new Date().getTime()).toString(36).toUpperCase().replace( /\./g , '-');
            })();



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
            makebroadcast();
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

            var socket = io.connect(socketurl);
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
