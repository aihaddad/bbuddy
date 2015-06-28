(function() {
  'use strict';

  angular
    .module('app.core')
    .config(otherwisePath);

  otherwisePath.$inject     = ['$urlRouterProvider'];

  ////////////////////

  function otherwisePath($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }
})();
