/* This service is temporary and offers a console-only logger interface to bypass
 * the circular dependency issues with $mdToast, so keep following up on the topic
 */
(function() {
  'use strict';

  angular
    .module('blocks.logger')
    .factory('plainLogger', plainLogger);

  plainLogger.$inject = ['$log'];

  function plainLogger($log) {
    var service = {
      error   : error,
      info    : info,
      success : success,
      warning : warning,

      log     : $log.log
    };

    return service;

    ////////////////////

    function error(message, data) {
      data = data || '';
      $log.error('Error: ' + message, data);
    }

    function info(message, data) {
      data = data || '';
      $log.info('Info: ' + message, data);
    }

    function success(message, data) {
      data = data || '';
      $log.info('Success: ' + message, data);
    }

    function warning(message, data) {
      data = data || '';
      $log.warn('Warning: ' + message, data);
    }
  }
}());
