(function() {
  'use strict';

  angular
    .module('blocks.exception')
    .factory('exception', exception);

  exception.$inject = ['plainLogger'];

  ////////////////////

  function exception(plainLogger) {
    var service = {
      catcher: catcher
    };
    return service;

    function catcher(message) {
      return function(reason) {
        plainLogger.error(message, reason);
      };
    }
  }
})();
