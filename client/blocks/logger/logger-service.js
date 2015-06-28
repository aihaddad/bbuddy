(function() {
  'use strict';

  angular
    .module('blocks.logger')
    .factory('logger', logger);

  logger.$inject = ['$log', '$mdToast'];

  function logger($log, $mdToast) {
    var service = {
      error   : error,
      info    : info,
      success : success,
      warning : warning,

      // bypass $mdToast
      log     : $log.log,
      // bypass console logging
      toast   : toast
    };

    var toastPosition = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };

    return service;

    ////////////////////

    function getToastPosition() {
      return Object.keys(toastPosition)
        .filter(function(pos) { return toastPosition[pos]; })
        .join(' ');
    }

    function toast(message) {
      $mdToast.show(
        $mdToast.simple()
          .content(message)
          .position(getToastPosition())
          .hideDelay(4500)
      );
    }

    function error(message, data) {
      data = data || '';
      $log.error('Error: ' + message, data);
      toast(message);
    }

    function info(message, data) {
      data = data || '';
      $log.info('Info: ' + message, data);
      toast(message);
    }

    function success(message, data) {
      data = data || '';
      $log.info('Success: ' + message, data);
      toast(message);
    }

    function warning(message, data) {
      data = data || '';
      $log.warn('Warning: ' + message, data);
      toast(message);
    }
  }
}());
