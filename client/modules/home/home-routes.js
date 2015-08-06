(function() {
  'user strict';

  angular
    .module('app.home')
    .run(configRoutes);

  configRoutes.$inject = ['routeHelper'];

  ////////////////////

  function configRoutes(routeHelper) {
    routeHelper
      .configureStates([
        {
          state: 'home',
          config: {
            abstract: true,
            template: '<ui-view></ui-view>',
            controller: 'Home as home',
            resolve: { // @ngInject
              auth: function($auth, $state, $location) {
                return $auth.validateUser()
                  .catch(function () {
                    if ($location.path() === '/') {
                      $state.go('auth.register');
                    } else {
                      $state.go('auth.login');
                    }
                  });
              }
            }
          }
        },
        {
          state: 'home.base',
          config: {
            url: '/',
            templateUrl: 'modules/home/home.html',
            authorization: ['Anonymous']
          }
        }
      ]);
  }
})();
