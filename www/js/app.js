// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
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
        templateUrl: 'templates/login.html',
        controller: 'AppCtrl'
      })



    .state('index', {
    url: '/index',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })



  .state('index.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })


  .state('index.newcare', {
    url: '/newcare',
    views: {
      'menuContent': {
        templateUrl: 'templates/newcare.html',
        controller: 'NewCareCtrl'
      }
    }
  })
  .state('index.newcareunknwon', {
    url: '/newcareunknwon',
    views: {
      'menuContent': {
        templateUrl: 'templates/newcareunknwon.html',
        controller: 'NewCareCtrl'
      }
    }
  })
   .state('index.newcarewithcard', {
    url: '/newcarewithcard',
    views: {
      'menuContent': {
        templateUrl: 'templates/newcarewithcard.html',
        controller: 'NewCareCtrl'
      }
    }
  })

   .state('index.selecttemp', {
    url: '/selecttemp/:username:cardno',
    views: {
      'menuContent': {
        templateUrl: 'templates/choosetemp.html',
        /*params: ['user'],*/
        controller: 'ChooseTempCtrl'
      }
    }
  })

    .state('index.caretemplistsingle', {
      url: '/choosetemp/:sigleId',
      views: {
        'menuContent': {
          templateUrl: 'templates/caretemplist.html',
          controller: 'CaretemplistCtrl'
        }
      }
    })

  .state('index.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('index.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
      .state('index.caredetails', {
      url: '/caredetails',
      views: {
        'menuContent': {
          templateUrl: 'templates/caredetails.html',
          controller: 'CaredetailsCtrl'
        }
      }
    }).state('index.singlecare', {
            url: '/caredetails/:caredetailId',
            views: {
              'menuContent': {
                templateUrl: 'templates/caredetail.html',
                controller: 'CaredetailsCtrl'
              }
            }
     })

  .state('index.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
