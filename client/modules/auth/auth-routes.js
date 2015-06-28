(function() {
  'user strict';

  angular
    .module('app.auth')
    .run(configRoutes);

  configRoutes.$inject = ['routeHelper'];

  ////////////////////

  function configRoutes(routeHelper) {
    routeHelper
      .configureStates([
        {
          state: 'auth',
          config: {
            abstract: true,
            templateUrl: 'modules/auth/auth.html',
            controller: /* @ngInject */ function ($state, $auth) {
              $auth.validateUser()
                .then(function (user) {
                  $state.go('home.landing');
                });
            }
          }
        },
        {
          state: 'auth.register',
          config: {
            url: '/',
            template: '<bb-auth-form type="register"></bb-auth-form>',
            authorization: ['Anonymous']
          }
        },
        {
          state: 'auth.login',
          config: {
            url: '/login',
            template: '<bb-auth-form type="login"></bb-auth-form>',
            title: 'Login',
            authorization: ['Anonymous']
          }
        }
      ]);
  }
})();
