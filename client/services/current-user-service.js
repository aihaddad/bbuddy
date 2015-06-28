(function() {
  'use strict';

  angular
    .module ('app.core')
    .factory('currentUser', currentUser);

  currentUser.$inject = ['$rootScope', '$auth', '$state', 'logger'];

  ////////////////////

  function currentUser($rootScope, $auth, $state, logger) {
    var appUser;

    var service = {
      authenticate: authenticate,

      signIn: signIn,
      signOut: signOut,
      signedIn: signedIn,

      signUp: signUp,

      set: setUser,
      user: appUser
    };

    return service;

    ////////////////////

    function authenticate(provider) {
      $auth.authenticate(provider);
    }

    function setUser(user) {
      appUser = user;
    } // <- needs better implementation

    function signIn(loginForm) {
      $auth.submitLogin(loginForm)
        .then(function(user) {
          setUser(user);
          logger.success('Welcome back ' + user['first_name']);
        })
        .catch(function(resp) {
          logger.error(resp.errors);
          logger.log(resp);
        });
    }

    function signOut() {
      $auth.signOut()
        .then(function(resp) {
          $state.go('auth.register');
          logger.success('You are now signed out');
        })
        .catch(function(resp) {
          logger.warning('Error signing out');
          logger.log(resp);
        });
    }

    function signedIn() {
      return $rootScope.signedIn;
    }

    function signUp(registrationForm) {
      registrationForm.uid = registrationForm.email;
      $auth.submitRegistration(registrationForm)
        .then(function(user) {
          $auth.submitLogin({
            email:    registrationForm.email,
            password: registrationForm.password
          });
          setUser(user);
          logger.success('Well, hello there. Welcome to BiteBuddy');
        })
        .catch(function(resp) {
          logger.error(resp.data.errors['full_messages']);
        });
    }
  }
}());
