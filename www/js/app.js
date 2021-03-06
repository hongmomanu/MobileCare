// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var serverurl = localStorage.serverurl;//"http://192.168.2.100:3000/"
//var socketurl = localStorage.serverurl.replace(/(:\d+)/g,":8001");//"http://192.168.2.100:8001/";
var socketurl = "http://111.1.76.108:8001/";

var staticurl="http://111.1.76.108/"
//var broadcasturl = localStorage.serverurl.replace(/(:\d+)/g,":8888");//"http://192.168.2.100:8888/";
var broadcasturl = "http://111.1.76.108:8888/";
var videosrc = "";
var last = true;
angular.module('starter', ['ionic', 'app.controllers', 'app.services'])

    .run(function ($ionicPlatform, $rootScope,$state,$ionicPopup,$ionicHistory,$ionicLoading,$timeout) {

        $ionicPlatform.registerBackButtonAction(function(e) {
            e.preventDefault();
            /**
             * 退出app
             */
            function showConfirm() {
                $ionicPopup.confirm({
                    title: '<strong>温馨提示</strong>',
                    subTitle: '<p>确定退出移动急救平台?</p>',
                    okText: '退 出',
                    okType: 'button-positive',
                    cancelText: '取 消'
                }).then(function(res) {
                    if (res) {
                        $rootScope.$broadcast('stoprecording');
                        $ionicLoading.show({template: '正在关闭程序...', duration: 5000});
                        $timeout(function () {
                            ionic.Platform.exitApp();
                        },5000);


                    } else {
                        // Don't close
                    }
                });
            }

            /**
             *
             * @param title 标题
             * @param content 内容
             */
            // Is there a page to go back to?

            if ($ionicHistory.backView()) {

                $ionicHistory.goBack(-1);
            } else {
                // This is the last page: Show confirmation popup
                showConfirm();
            }
            return false;
        }, 101);

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/login',
                //templateUrl: 'templates/login.html',
                templateUrl: localStorage.serverurl + 'templates/login.html?t=' + (new Date().getTime()),
                controller: 'AppCtrl'
            })


            .state('index', {
                url: '/index',
                abstract: true,
                //templateUrl: 'templates/menu.html',
                templateUrl: localStorage.serverurl + 'templates/menu.html?t=' + (new Date().getTime()),
                controller: 'NewCareCtrl'
            })


            .state('index.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        //templateUrl: 'templates/search.html'
                        templateUrl: localStorage.serverurl + 'templates/search.html?t=' + (new Date().getTime())
                    }
                }
            })


            .state('index.newcare', {
                url: '/newcare',
                views: {
                    'menuContent': {
                        //templateUrl: 'templates/newcare.html',
                        templateUrl: localStorage.serverurl + 'templates/newcare.html?t=' + (new Date().getTime()),
                        controller: 'NewCareCtrl'
                    }
                }
            })
            .state('index.newcareunknwon', {
                url: '/newcareunknwon',
                views: {
                    'menuContent': {
                        //templateUrl: 'templates/newcareunknwon.html',
                        templateUrl: localStorage.serverurl + 'templates/newcareunknwon.html?t=' + (new Date().getTime()),
                        controller: 'NewCareCtrl'
                    }
                }
            })
            .state('index.newcarewithcard', {
                url: '/newcarewithcard',
                views: {
                    'menuContent': {
                        //templateUrl: 'templates/newcarewithcard.html',
                        templateUrl: localStorage.serverurl + 'templates/newcarewithcard.html?t=' + (new Date().getTime()),
                        controller: 'NewCareCtrl'
                    }
                }
            })

            .state('index.selecttemp', {
                url: '/selecttemp/:username:cardno',
                views: {
                    'menuContent': {
                        //templateUrl: 'templates/choosetemp.html',
                        templateUrl: localStorage.serverurl + 'templates/choosetemp.html?t=' + (new Date().getTime()),
                        /*params: ['user'],*/
                        controller: 'ChooseTempCtrl'
                    }
                }
            })

            .state('index.caretemplistsingle', {
                url: '/choosetemp/:sigleId',
                views: {
                    'menuContent': {
                        //templateUrl: 'templates/caretemplist.html',
                        templateUrl: localStorage.serverurl + 'templates/caretemplist.html?t=' + (new Date().getTime()),
                        controller: 'CaretemplistCtrl'
                    }
                }
            })

            .state('index.browse', {
                url: '/browse',
                views: {
                    'menuContent': {
                        //templateUrl: 'templates/browse.html'
                        templateUrl: localStorage.serverurl + 'templates/browse.html?t=' + (new Date().getTime())
                    }
                }
            })
            .state('index.remotecarings', {
                url: '/remotecarings',
                views: {
                    'menuContent': {
                        //templateUrl: 'templates/playlists.html',
                        templateUrl: localStorage.serverurl + 'templates/remotecarings.html?t=' + (new Date().getTime()),
                        controller: 'RemotecaringsCtrl'
                    }
                }
            })
            .state('index.caredetails', {
                url: '/caredetails',
                cache: false,
                views: {
                    'menuContent': {
                        //templateUrl: 'templates/caredetails.html',
                        templateUrl: localStorage.serverurl + 'templates/caredetails.html?t=' + (new Date().getTime()),
                        controller: 'CaredetailsCtrl'
                    }
                }
            }).state('index.singlecare', {
                url: '/caredetails/:caredetailId',
                views: {
                    'menuContent': {
                        //templateUrl: 'templates/caredetail.html',
                        templateUrl: localStorage.serverurl + 'templates/caredetail.html?t=' + (new Date().getTime()),
                        controller: 'CaredetailCtrl'
                    }
                }
            })

            .state('index.single', {
                url: '/playlists/:playlistId',
                views: {
                    'menuContent': {
                        //templateUrl: 'templates/playlist.html',
                        templateUrl: localStorage.serverurl + 'templates/playlist.html?t=' + (new Date().getTime()),
                        controller: 'PlaylistCtrl'
                    }
                }
            })
            .state('index.remotecaring', {
                url: '/remotecarings/:username/:realname',
                views: {
                    'menuContent': {
                        templateUrl: localStorage.serverurl + 'templates/remotecaring.html?t=' + (new Date().getTime()),
                        controller: 'RemotecaringCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');
    });
