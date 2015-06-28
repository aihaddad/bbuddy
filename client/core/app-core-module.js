(function () {
  'use strict';

  angular
    .module('app.core', [

      // Angular-specific modules
      'ngAnimate',
      'ngAria',
      'ngResource',
      'ngMessages',
      'ngCookies',

      // 3rd party modules
      'ngMaterial',
      'ui.router',
      'ng-token-auth',

      // Reuseable application modules
      'blocks.exception',
      'blocks.logger',
      'blocks.router'
  ]);

})();

/** Possible modules
 * 'ngAnimate', 'ngAria', 'ngCookies',
 * 'ngMaterial', 'ngMessages', 'ngSanitize', 'ngRoute', 'ngTouch',
 *
 * 'ui.router',
 *
 * 'blocks.exception', 'blocks.exception', 'blocks.router'
*/
