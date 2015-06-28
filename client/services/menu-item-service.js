(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('MenuItem', MenuItem);

  MenuItem.$inject = ['$resource'];

  ////////////////////

  function MenuItem($resource) {
    return $resource('/api/menu_items/:id',
        {
          id: '@id'
        },
        {
          index: {method: 'GET', isArray: true},
          show:  {method: 'GET', isArrat: false}
        }
      );
  }
}());
