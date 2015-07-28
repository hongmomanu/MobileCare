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
.controller('CaretemplistCtrl', function($scope, $stateParams,$http,$ionicLoading) {

    testobj=$http;
    console.log($stateParams);
    $scope.devList = [
        { text: "处置1",data:[{ text: "挂盐水", checked: true },
            { text: "打针", checked: false },
            { text: "输氧", checked: false }]},
        { text: "处置2",data:[{ text: "挂盐水", checked: true },
            { text: "打针", checked: false },
            { text: "输氧", checked: false }]},
        { text: "处置3",data:[{ text: "挂盐水", checked: true },
            { text: "打针", checked: false },
            { text: "输氧", checked: false }]},
    ];



}).directive('formManager', function($ionicLoading) {
        return {
            restrict : 'A',
            controller : function($scope) {

                $scope.$watch('newCareForm.$valid', function() {
                    console.log("Form validity changed. Now : " + $scope.newCareForm.$valid);
                });

                $scope.savecare = function() {

                    if($scope.newCareForm.$valid) {
                        //$scope.finalSubmit();
                        //alert(1)
                        $ionicLoading.show({ template: 'Submitting...', duration: 1500})
                    } else {
                        $ionicLoading.show({ template: 'Form Is Not Valid', duration: 1500})
                    }


                }
            }
        }
    })
 .directive('textarea', function() {
        return {
            restrict: 'E',
            link: function(scope, element, attr){
                var update = function(){
                    element.css("height", "auto");
                    var height = element[0].scrollHeight;
                    element.css("height", element[0].scrollHeight + "px");
                };
                scope.$watch(attr.ngModel, function(){
                    update();
                });
            }
        };
    });


/*.controller('CaretemplistsCtrl', function($scope) {

})*/







