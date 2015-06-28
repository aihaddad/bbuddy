(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('Home', Home);

  Home.$inject = ['$mdDialog', '$rootScope', 'MenuItem'];

  ////////////////////

  function Home($mdDialog, $rootScope, MenuItem) {
    var vm = this;

    vm.sendMessage = function() {
      var message = {
        user: $rootScope.user,
        message: vm.messageForm.message
      };
      console.log(message);
    };

    vm.showMenuItem = function(ev, id) {
      console.log(ev);
      console.log(id);
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'modules/home/menu-item-dialog.html',
        targetEvent: ev,
      })
      .then(function(answer) {
        // $scope.alert = 'You said the information was "' + answer + '".';
      }, function() {
        // $scope.alert = 'You cancelled the dialog.';
      });
    };

    // MenuItem.get({id: 1}, function (response) {
    //   vm.menuItem = response['menu_item'];
    //   console.log(vm.menuItem);
    // });

    MenuItem.query()
      .$promise
      .then(function (items) {
        vm.menuItems = items;
      });

    ////////////////////

    // @ngInject

    function DialogController($scope) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }
  }
}());
