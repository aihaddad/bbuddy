(function() {
  'use strict';

  angular
    .module('app.components')
    .directive('bbFooter', bbLogo);

  function bbLogo () {
    // This needs to accomodate for variable content
    return {
      restrict: 'AE',
      templateUrl: 'components/bb-footer/bb-footer.html'
    };
  }
}());
