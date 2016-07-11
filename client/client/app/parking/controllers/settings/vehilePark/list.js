'use strict';

var app=angular.module('parkingApp');

app.controller('vehileparklist',['$scope','$http','dialog',function ($scope, $http, dialog) {
  var vm = this;

  vm.carparkinglist = [];
  vm.parkinglotlist = [];

  //停车场查询
  vm.getCarParkList = function(){
    $http.get(lpt_host + '/zeus/ws/parking/pparkingmg/getlist',{ params: {page:'1',rows:'999'}}).success(function(data) {
      if(data.code == "200"){
        vm.carparkinglist = data.body.data;
        vm.parking = data.body.data[0];
        vm.getParkinglotlist(vm.parking.id);
      }
    });
  }

  //添加停车场
  vm.clickToAddPark = function () {
    dialog.open({ 
      template : 'app/parking/views/settings/vehilePark/addPark.html',
      scope : $scope,//将scope传给test.html,以便显示地址详细信息  
      preCloseCallback : function(data) {
        // if(confirm('Are you sure you want to close without saving your changes?')) {
        //   return true;
        // }
        // return false;
        if(data!=null && data.code == "200"){
          vm.getCarParkList();
        }
      }
    });
  }

  //删除停车场
  vm.clickToDeletePark = function (vehicletype) {
    dialog.confirmDialog('确认是否要删除['+ vehicletype.parkname +']?').then(function (data) {
      if (data) {
        $http.delete(lpt_host + '/zeus/ws/parking/pparkingmg/delete/' + vehicletype.id)
        .success(function(data){
          vm.getCarParkList();
          dialog.notify('删除成功！', 'success');
        });
      }
    });
  }

  //查询停车位
  vm.getParkinglotlist = function(parkingid){
    $http.get(lpt_host + '/zeus/ws/parking/pparking/getParkingInfo/' + parkingid).success(function(data) {
      if(data.code == "200"){
        // vm.parkinglotlist = [];
        // var row = 0;
        // var count = data.body.length;
        // var group = count / 5;
        // for (var i = 0;i< group; i++) {
        //   var gp = {
        //     item : i,
        //     data : []
        //   };
        //   for (var j = 0; j < 5; j++) {
        //     if(data.body[row] != null){
        //       gp.data.push(data.body[row]);
        //     }
            
        //     row++;
        //   };
        //   vm.parkinglotlist.push(gp);
        // }
        vm.parkinglotlist = data.body;
      }
    });
  }

  //添加车位
  vm.clickToAddSeat = function () {
    $scope.carparking = vm.parking;
    dialog.open({ 
      template : 'app/parking/views/settings/vehilePark/addSeat.html',
      scope : $scope,//将scope传给test.html,以便显示地址详细信息  
      preCloseCallback : function(data) {
        // if(confirm('Are you sure you want to close without saving your changes?')) {
        //   return true;
        // }
        // return false;
        if(data != null && data.code == "200"){
          vm.getParkinglotlist(vm.parking.id);
        }
      }
    });
  }

  //删除车位
  vm.clickToDeleteSeat = function (parkseat) {
    dialog.confirmDialog('确认是否要删除车位[' + parkseat.parkingno + ']?').then(function (data) {
      if (data) {
        $http.delete(lpt_host + '/zeus/ws/parking/pparking/delete/' + parkseat.id)
        .success(function(data){
          if(data != null && data.code=="200"){
            vm.getParkinglotlist(vm.parking.id);
            dialog.notify('删除成功！', 'success');
          }
        });
      }
    });
  }


  // vm.clickToEditSeat = function () {
  //   dialog.open({ 
  //     template : 'app/parking/views/settings/vehilepark/update.html',
  //     scope : $scope,//将scope传给test.html,以便显示地址详细信息  
  //     preCloseCallback : function(data) {
  //       // if(confirm('Are you sure you want to close without saving your changes?')) {
  //       //   return true;
  //       // }
  //       // return false;
  //       if(data != null){
  //         alert(data);
  //       }
  //     }
  //   });
  // }

  vm.activepark = function(parking){
    vm.parking = parking;
    vm.getParkinglotlist(vm.parking.id);
  }

  vm.getCarParkList();
}]);