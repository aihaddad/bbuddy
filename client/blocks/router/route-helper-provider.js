(function() {
  'use strict';

  angular
    .module('blocks.router')
    .provider('routeHelper', routeHelperProvider);

  routeHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

  ////////////////////

  function routeHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
    // jshint validthis:true
    var config = {
      authorization: ['Public'],
      docTitle: 'BiteBuddy',
      resolveAlways: {}
    };

    // $locationProvider.html5Mode(true);

    this.configure = function(cfg) {
      angular.extend(config, cfg);
    };

    this.$get = RouteHelper;
    RouteHelper.$inject = ['$location', '$rootScope', '$state', '$auth', 'logger'];

    ////////////////////

    function RouteHelper($location, $rootScope, $state, $auth, logger) {
      var handlingStateChangeError = false;
      var hasOtherwise = false;
      var stateCounts = {
        errors: 0,
        changes: 0
      };

      var service = {
        configureStates: configureStates,
        getStates: getStates,
        stateCounts: stateCounts
      };

      init();

      return service;

      ////////////////////

      function configureStates(states, otherwisePath) {
        states.forEach(function(state) {
          state.config.resolve =
            angular.extend(state.config.resolve || {}, config.resolveAlways);

          state.config.authorization =
            state.config.authorization || config.authorization;

          $stateProvider.state(state.state, state.config);
        });

        if (otherwisePath && !hasOtherwise) {
          hasOtherwise = true;
          $urlRouterProvider.otherwise(otherwisePath);
        }
      }

      function handleRoutingErrors() {
        // Route cancellation:
        // On routing error, go to the homepage.
        // Provide an exit clause if it tries to do it twice.
        $rootScope.$on('$stateChangeError',
          function(event, toState, toParams, fromState, fromParams, error) {
            if (handlingStateChangeError) {
              return;
            }
            stateCounts.errors++;
            handlingStateChangeError = true;
            var destination = (toState &&
              (toState.title || toState.name || toState.loadedTemplateUrl)) ||
              'unknown target';
            var msg = 'Error routing to ' + destination + '. ' +
              (error.data || '') + '\n' + (error.statusText || '') +
              ': ' + (error.status || '');
            logger.error(msg, [toState]);
            $location.path('/');
          }
        );
      }

      function init() {
        handleRoutingErrors();
        updateDocTitle();
      }

      function getStates() { return $state.get(); }

      function updateDocTitle() {
        $rootScope.$on('$stateChangeSuccess',
          function(event, toState, toParams, fromState, fromParams) {
            var title;
            stateCounts.changes++;
            handlingStateChangeError = false;
            if (toState.title) {
              title = config.docTitle + ' | ' + toState.title;
            } else {
              title = config.docTitle;
            }

            $rootScope.title = title; // data bind to <title>
          }
        );
      }

    }
  }
}());
