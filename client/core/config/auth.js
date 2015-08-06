(function() {
  'use strict';

  angular
    .module('app.core')
    .config(ngTokenAuth)
    .run(handleAuthEvents);

  handleAuthEvents.$inject    = ['$rootScope', '$state'];
  ngTokenAuth.$inject         = ['$authProvider', 'BACKEND'];

  ////////////////////

  function handleAuthEvents($rootScope, $state) {
    $rootScope
      .$on('auth:login-success', function(event, user) {
          $state.go('home.base');
        });
  }

  function ngTokenAuth($authProvider, BACKEND) {
    $authProvider.configure({
      apiUrl: BACKEND.apiPath
    });
  }
})();
