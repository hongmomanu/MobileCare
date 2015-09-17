angular.module('app.controllers')

    .controller('videoCtrl', function ($scope,$rootScope,$timeout) {
        console.log('videoCtrl');
        //var last=false;
        var exArray = []; //存储设备源ID

        var participants = document.getElementById("videodivwrap");
        //var startConferencing = document.getElementById('start-conferencing');
        var roomsList = document.getElementById('rooms-list');
        var config=null;
        var broadcastUI=null;



        //var socket=null;

        var makebroadconfig=function(isnew){
             config = {
                openSocket: function(config) {


                    console.log('openSocket init channel');

                    var SIGNALING_SERVER = broadcasturl;

                    config.channel = config.channel || 'mainchannel'; //location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');
                    //config.channel = (new Date()).getTime();
                    console.log(config.channel);
                    var sender = Math.round(Math.random() * 999999999) + 999999999;

                    var newsocket=ioold.connect(SIGNALING_SERVER, {
                         'force new connection': isnew

                     }).emit('new-channel', {
                        channel: config.channel,
                        sender: sender
                    });


                    var socket=ioold.connect(SIGNALING_SERVER + config.channel, {
                        'force new connection': isnew
                    });


                    socket.channel = config.channel;


                    socket.on('connect', function () {
                        console.log('socketconnect')
                        if (config.callback) config.callback(socket);
                    });

                    console.log(4444444)
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
                    config.remotevideo=media.stream;

                    video.setAttribute('controls', true);

                    if(participants.childElementCount>0)video.style.display='none';
                    //alert()
                    participants.insertBefore(video, participants.firstChild);
                    //$(video).hide();
                    testobj=participants;
                    console.log(participants);

                    video.play();
                    if($('#remotecaringvideo').length>0)$('#remotecaringvideo')[0].src=video.src;
                    //rotateVideo(video);
                },
                onRoomFound: function(room) {

                    //alert(111);
                    //console.log(room);
                    $ionicLoading.hide();
                    var alreadyExist = document.getElementById(room.broadcaster);
                    if (alreadyExist) return;

                    if (typeof roomsList === 'undefined') roomsList = document.body;

                    var tr = document.createElement('tr');
                    tr.setAttribute('id', room.broadcaster);
                    tr.setAttribute('trname', room.roomName);
                    tr.innerHTML = '<td>' + room.roomName + '</td>' +
                    '<td><button class="join" id="' + room.roomToken + '">Join Room</button></td>';
                    roomsList.insertBefore(tr, roomsList.firstChild);

                    tr.onclick = function() {
                        tr = this;

                        $rootScope.$broadcast('roomclick',tr);
                        //captureUserMedia(function() {

                    };
                }
            };
            return config
        };

        makebroadconfig(false);


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
                    alert('你的设备没有摄像头.');
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
                constraints :{
                    audio: true,
                    video: {
                        'optional': [{
                            'sourceId': exArray[1] //0为前置摄像头，1为后置
                        }]
                    }
                },
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

        broadcastUI = broadcast(config);




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

        /*(function() {
            var uniqueToken = document.getElementById('unique-token');
            if (uniqueToken)
                if (location.hash.length > 2) uniqueToken.parentNode.parentNode.parentNode.innerHTML = '<h2 style="text-align:center;"><a href="' + location.href + '" target="_blank">Share this link</a></h2>';
                else uniqueToken.innerHTML = uniqueToken.parentNode.parentNode.href = '#' + (Math.random() * new Date().getTime()).toString(36).toUpperCase().replace( /\./g , '-');
        })();*/

        $rootScope.$on('joinroomclick', function (event, username) {

            console.log($(roomsList));
            console.log($(roomsList).find('tr[trname$="'+username+'"]'));
            $(roomsList).find('tr[trname$="'+username+'"]').click();

        });
        $rootScope.$on('roomclick', function (event,tr) {

            captureUserMediaWithOutView(function() {
                broadcastUI.joinRoom({
                    roomToken: tr.querySelector('.join').id,
                    joinUser: tr.id
                });

            });
            hideUnnecessaryStuff();

        });
        $rootScope.$on('remoteleaved', function (event) {


            window.location.reload();

        });

        var makebroadcast=function(){
            createButtonClickHandler(localStorage.username);
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
                //if(mediaStream) mediaStream.stop();
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
                mediaStream=stream;

                var video=$('#videodiv')[0];
                video.src=URL.createObjectURL(stream);
                video.setAttribute('muted', true);
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
                callback(3000);



            }

            function onMediaError(e) {
                console.error('media error', e);
            }

        });

    });
