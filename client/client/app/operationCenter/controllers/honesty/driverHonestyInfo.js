'use strict';

var app = angular.module('opCenterApp');
app.controller('driverHonestyInfoCtrl', ['$scope', '$http', 'dialog', 'honestyService', function ($scope, $http, dialog, honestyService) {
    var vm = this;

    //查询车辆类型
    vm.getDriverHonestyInfo = function(){
        honestyService.getDriverHonestyInfo($scope.eid).then(function (response) {
            if(response.data.code == "200"){
                vm.jsondata = response.data.body;
            }
        });
    }

    vm.cancel = function(){
        $scope.closeThisDialog(null);
    }

    vm.getDriverHonestyInfo();
}]);