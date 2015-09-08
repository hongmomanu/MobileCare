angular.module('main.newcarecontroller', [])

.controller('NewCareCtrl', function($scope, $ionicModal, $timeout, $state,$ionicPopup) {

  $scope.newcarenocardnext=function(user){

    console.log(user);
    $state.go('index.selecttemp',user);

  };

   $scope.newcarecardnext=function(user){
       console.log(user);
       //alert(11);
       $state.go('index.selecttemp', user);
    //$state.go('index.choosetemp');
  };

    $scope.demo = 'nocard';
    $scope.newCare = function(p) {
        document.body.classList.remove('platform-card');
        document.body.classList.remove('platform-nocard');
        document.body.classList.add('platform-' + p);
        $scope.demo = p;
        if(p=='nocard'){
            $state.go('index.newcareunknwon');
        }else{
            $state.go('index.newcarewithcard');
        }
    }


})
.controller('ChooseTempCtrl',function($scope, $stateParams,$http,$ionicLoading,tempService,$rootScope){
        console.log($stateParams);

        $rootScope.$on('tempinit', function (event, otherscope) {
            otherscope.carerecord=$stateParams;
        });

        tempService.getCaretemp().then(function(response){
            $scope.caretemplists=response.data;
        });


})
.controller('CaretemplistCtrl', function($scope, $stateParams,$http,$ionicLoading,tempService,$rootScope) {

    testobj=$http;
    console.log($stateParams);
    tempService.getCaretempByid($stateParams.sigleId).then(function(response){
        $scope.devList=response.data.content;
    });
    $rootScope.$broadcast('tempinit', $scope);



}).controller('CaredetailsCtrl', function($scope) {
        $scope.caredetails = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];

        $scope.data = {
            clientSide: '主体'
        };
        $scope.clientSideList = [
            { text: "主体", value: "主体" },
            { text: "客体", value: "客体" }
        ];

    })

.controller('CaredetailCtrl', function($scope, $stateParams,$http) {

    //testobj=$http;
     console.log(12121);
    console.log($stateParams);

})
.directive('formManager', function($ionicLoading) {
        return {
            restrict : 'A',
            controller : function($scope,$state,$ionicHistory) {

                $scope.$watch('newCareForm.$valid', function() {
                    console.log("Form validity changed. Now : " + $scope.newCareForm.$valid);
                });

                $scope.savecare = function() {

                    if($scope.newCareForm.$valid) {
                        //$scope.finalSubmit();
                        //alert(1)
                        console.log( $scope.devList);
                        console.log( $scope.carerecord);
                        $ionicLoading.show({ template: 'Submitting...'});
                        setTimeout(function(){
                            $ionicLoading.hide();
                            $ionicHistory.nextViewOptions({
                                disableBack: true
                            });

                            $state.go('index.singlecare',{caredetailId:2});
                        },2000)
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







