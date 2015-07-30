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
.controller('ChooseTempCtrl',function($scope, $stateParams,$http,$ionicLoading){
        console.log($stateParams);

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
    $scope.formcontent = {
        a:true,
        b:false,
        c:false,
        d:true,
        e:false,
        f:false,
        g:true,
        h:false,
        i:false,
        myoption:''

    };

    $scope.devList = [
        { text: "处置1",data:[{ text: "挂盐水", checked: true,name:'a' },
            { text: "打针", checked: false,name:'b' },
            { text: "输氧", checked: false,name:'c' }]},
        { text: "处置2",data:[{ text: "挂盐水", checked: true ,name:'d'},
            { text: "打针", checked: false ,name:'e'},
            { text: "输氧", checked: false ,name:'f'}]},
        { text: "处置3",data:[{ text: "挂盐水", checked: true ,name:'g'},
            { text: "打针", checked: false ,name:'h'},
            { text: "输氧", checked: false ,name:'i'}]},
    ];



}).directive('formManager', function($ionicLoading) {
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
                        console.log( $scope.formcontent);
                        $ionicLoading.show({ template: 'Submitting...'});
                        setTimeout(function(){
                            $ionicLoading.hide();
                            $ionicHistory.nextViewOptions({
                                disableBack: true
                            });
                            $state.go('index.search');
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







