/* The following is an exact copy of John Papa's implementation. Further reading on the topic
 * is still needed as I learn about exception handling
 */

// Include in index.html so that app level exceptions are handled.
// Exclude from testRunner.html which should run exactly what it wants to run
(function() {
  'use strict';

  angular
    .module('blocks.exception')
    .provider('exceptionHandler', exceptionHandlerProvider)
    .config(config);

  ////////////////////

  // Must configure the exception handling

  function exceptionHandlerProvider() {
    /* jshint validthis:true */
    this.config = {
      appErrorPrefix: undefined
    };

    this.configure = function (appErrorPrefix) {
      this.config.appErrorPrefix = appErrorPrefix;
    };

    this.$get = function() {
      return {config: this.config};
    };
  }

  config.$inject = ['$provide'];
  /* Configure by setting an optional string value for appErrorPrefix.
   * Accessible via config.appErrorPrefix (via config value).
   */
  function config($provide) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
  }

  // Extend the $exceptionHandler service to also display a toast.

  extendExceptionHandler.$inject = ['$delegate', 'exceptionHandler', 'plainLogger'];

  function extendExceptionHandler($delegate, exceptionHandler, plainLogger) {
    return function(exception, cause) {
      var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
      var errorData = {exception: exception, cause: cause};
      exception.message = appErrorPrefix + exception.message;
      $delegate(exception, cause);

      /* Could add the error to a service's collection,
       * add errors to $rootScope, log errors to remote web server,
       * or log locally. Or throw hard. It is entirely up to you.
       * throw exception;
       */
      plainLogger.error(exception.message, errorData);
    };
  }
})();
