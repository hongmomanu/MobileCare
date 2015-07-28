angular.module('main.newcarecontroller', [])

.controller('NewCareCtrl', function($scope, $ionicModal, $timeout, $state,$ionicPopup) {

  $scope.newcarenocardnext=function(user){

    console.log(user);
    $state.go('index.choosetemp');

  };

    $scope.demo = 'nocard';
    $scope.newCare = function(p) {
        document.body.classList.remove('platform-card');
        document.body.classList.remove('platform-nocard');
        document.body.classList.add('platform-' + p);
        $scope.demo = p;
        if(p=='nocard'){
            $state.go('index.newcareunknwon');
        }
    }
    $scope.caretemplists = [
        { title: '中毒', id: 1 },
        { title: '车祸', id: 2 },
        { title: '脑溢血', id: 3 },
        { title: '心肌梗塞', id: 4 },
        { title: '安眠药', id: 5 },
        { title: '中风', id: 6 }
    ];

})
.controller('CaretemplistCtrl', function($scope, $stateParams,$http) {

    testobj=$http;
    console.log($stateParams);
    $scope.devList = [
        { text: "检查1",data:[{ text: "挂盐水", checked: true },
            { text: "打针", checked: false },
            { text: "输氧", checked: false }]},
        { text: "检查2",data:[{ text: "挂盐水", checked: true },
            { text: "打针", checked: false },
            { text: "输氧", checked: false }]},
        { text: "检查3",data:[{ text: "挂盐水", checked: true },
            { text: "打针", checked: false },
            { text: "输氧", checked: false }]},
    ];

});


/*.controller('CaretemplistsCtrl', function($scope) {

})*/







