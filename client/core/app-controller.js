(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('App', App);

  App.$inject = ['routeHelper', 'currentUser'];

  ////////////////////

  function App(routeHelper, currentUser) {
    var vm = this;

    // routeHelper.loadRoutes();

    vm.logout = function() {
      currentUser.signOut();
    };
  }
})();
