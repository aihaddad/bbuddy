(function() {
  'use strict';

  angular
    .module('app.components')
    .directive('bbLogo', bbLogo);

  function bbLogo() {
    // This needs to be changed to accomodate for variable size classes
    var directive = {
      restrict: 'AE',
      templateUrl: 'components/bb-logo/bb-logo.html',
      controller: bbLogoCtrl
    };

    bbLogoCtrl.$inject = ['$rootScope', '$scope', '$state'];

    return directive;

    ////////////////////

    function bbLogoCtrl($rootScope, $scope, $state) {
      $scope.goHome = function() {
        if ($rootScope.user.id) {
          $state.go('home.base');
        } else {
          $state.go('auth.register');
        }
      };
    }
  }
}());
