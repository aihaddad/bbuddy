(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('Recipe', Recipe);

  Recipe.$inject = ['$resource'];

  ////////////////////

  function Recipe($resource) {
    return $resource('/api/recipes/:id',
        {
          id: '@id'
        },
        {
          index: {method: 'GET', isArray: true},
          show:  {method: 'GET', isArray: false}
        }
      );
  }
}());
