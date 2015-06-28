(function() {
  'use strict';

  angular
    .module('app.core')
    .config(mdTheming);

  mdTheming.$inject     = ['$mdThemingProvider'];

  ////////////////////

  function mdTheming($mdThemingProvider) {
    $mdThemingProvider.theme('bb-green')
      .primaryPalette('green', {
        'default': '800',
        'hue-1': '900',
        'hue-2': '700',
        'hue-3': '600'
      })
      .accentPalette('deep-orange', {
        'default': 'A200',
        'hue-1': 'A700',
        'hue-2': 'A200',
        'hue-3': 'A100'
      })
      .warnPalette('red');

    $mdThemingProvider.theme('bb-white')
      .primaryPalette('grey', {
        'default': '50'
      })
      .accentPalette('green', {
        'default': '800'
      });
  }
})();
