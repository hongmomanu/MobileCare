// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var serverurl="http://192.168.2.100:3000/";
var socketurl="http://192.168.2.100:8001";
var videosrc="";
var last=true;
angular.module('starter', ['ionic', 'starter.controllers','main.newcarecontroller','app.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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

.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('app', {
        url: '/login',
        //templateUrl: 'templates/login.html',
        templateUrl: localStorage.serverurl+'templates/login.html?t='+(new Date().getTime()),
        controller: 'AppCtrl'
      })



    .state('index', {
    url: '/index',
    abstract: true,
    //templateUrl: 'templates/menu.html',
    templateUrl: localStorage.serverurl+'templates/menu.html?t='+(new Date().getTime()),
    controller: 'NewCareCtrl'
  })



  .state('index.search', {
    url: '/search',
    views: {
      'menuContent': {
        //templateUrl: 'templates/search.html'
        templateUrl: localStorage.serverurl+'templates/search.html?t='+(new Date().getTime()),
      }
    }
  })


  .state('index.newcare', {
    url: '/newcare',
    views: {
      'menuContent': {
        //templateUrl: 'templates/newcare.html',
        templateUrl: localStorage.serverurl+'templates/newcare.html?t='+(new Date().getTime()),
        controller: 'NewCareCtrl'
      }
    }
  })
  .state('index.newcareunknwon', {
    url: '/newcareunknwon',
    views: {
      'menuContent': {
        //templateUrl: 'templates/newcareunknwon.html',
        templateUrl: localStorage.serverurl+'templates/newcareunknwon.html?t='+(new Date().getTime()),
        controller: 'NewCareCtrl'
      }
    }
  })
   .state('index.newcarewithcard', {
    url: '/newcarewithcard',
    views: {
      'menuContent': {
        //templateUrl: 'templates/newcarewithcard.html',
        templateUrl: localStorage.serverurl+'templates/newcarewithcard.html?t='+(new Date().getTime()),
        controller: 'NewCareCtrl'
      }
    }
  })

   .state('index.selecttemp', {
    url: '/selecttemp/:username:cardno',
    views: {
      'menuContent': {
        //templateUrl: 'templates/choosetemp.html',
        templateUrl: localStorage.serverurl+'templates/choosetemp.html?t='+(new Date().getTime()),
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
          templateUrl: localStorage.serverurl+'templates/caretemplist.html?t='+(new Date().getTime()),
          controller: 'CaretemplistCtrl'
        }
      }
    })

  .state('index.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          //templateUrl: 'templates/browse.html'
          templateUrl: localStorage.serverurl+'templates/browse.html?t='+(new Date().getTime())
        }
      }
    })
    .state('index.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          //templateUrl: 'templates/playlists.html',
          templateUrl: localStorage.serverurl+'templates/playlists.html?t='+(new Date().getTime()),
          controller: 'PlaylistsCtrl'
        }
      }
    })
      .state('index.caredetails', {
      url: '/caredetails',
      views: {
        'menuContent': {
          //templateUrl: 'templates/caredetails.html',
          templateUrl: localStorage.serverurl+'templates/caredetails.html?t='+(new Date().getTime()),
          controller: 'CaredetailsCtrl'
        }
      }
    }).state('index.singlecare', {
            url: '/caredetails/:caredetailId',
            views: {
              'menuContent': {
                //templateUrl: 'templates/caredetail.html',
                templateUrl: localStorage.serverurl+'templates/caredetail.html?t='+(new Date().getTime()),
                controller: 'CaredetailCtrl'
              }
            }
     })

  .state('index.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        //templateUrl: 'templates/playlist.html',
        templateUrl: localStorage.serverurl+'templates/playlist.html?t='+(new Date().getTime()),
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
