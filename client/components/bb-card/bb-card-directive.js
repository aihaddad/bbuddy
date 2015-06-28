(function() {
  'use strict';

  angular
    .module('app.components')
    .directive('bbCard', bbCard);

  ////////////////////

  function bbCard() {
    var directive = {
      templateUrl: 'components/bb-card/bb-card.html',
      transclude: true
    };

    return directive;
  }
}());
