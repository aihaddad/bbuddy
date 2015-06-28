(function() {
  'use strict';

  angular
    .module('app.components')
    .directive('bbAuthForm', bbAuthForm);

  function bbAuthForm() {
    var directive = {
      template:'<ng-include src="template"/>',
      scope: {
        type: '@'
      },
      link: function postLink(scope) {
        scope.template = 'components/bb-auth-form/bb-' + scope.type + '-form.html';
      },
      controllerAs: 'auth',
      controller: Auth
    };

    Auth.$inject = ['currentUser'];

    return directive;

    ////////////////////

    function Auth(currentUser) {
      var vm = this;

      vm.login = function() {
        currentUser.signIn(vm.loginForm);
      };

      vm.register = function() {
        currentUser.signUp(vm.registrationForm);
      };

      vm.facebookAuth = function() {
        currentUser.authenticate('facebook');
      };
    }
  }
}());
