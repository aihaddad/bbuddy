(function () {
  'use strict';

  angular
    .module('app', [

        // Main application modules
        'app.core',
        'app.components',

        // Feature modules
        // 'app.users',
        // 'app.dashboard',
        'app.home',
        'app.auth'
    ])
    .run(redirectAfterAuth);

  redirectAfterAuth.$inject = ['$rootScope', '$location'];

  ////////////////////

  function redirectAfterAuth($rootScope, $location) {
    $rootScope.$on('auth:login-success', function() {
      $location.path('/');
    });
  }

})();
