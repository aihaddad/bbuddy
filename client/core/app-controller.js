(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('App', App);

  App.$inject = ['$window', 'routeHelper', 'currentUser'];

  ////////////////////

  function App($window, routeHelper, currentUser) {
    var vm = this;

    // routeHelper.loadRoutes();

    vm.logout = function() {
      currentUser.signOut();
    };

    $window.loadingScreen.finish();
  }
})();
