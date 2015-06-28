(function() {
  'use strict';

  angular
    .module('app.components')
    .directive('bbLayout', bbLayout);

  ////////////////////

  function bbLayout() {
    var directive = {
      templateUrl: 'components/bb-layout/bb-layout.html',
      transclude: true
    };

    return directive;
  }
}());
