(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('Home', Home);

  Home.$inject = ['$window', 'Recipe'];

  ////////////////////

  function Home($window, Recipe) {
    var vm = this;

    vm.fetchRecipes = function() {
      Recipe.query()
        .$promise
        .then(function (recipes) {
          vm.recipes = recipes;
        });
    };

    vm.fetchRecipes();

    vm.sendUrl = function() {
      vm.recipes.push(vm.recipeUrlForm);
      var message = new Recipe();
      message.recipe = vm.recipeUrlForm;
      Recipe.save(message, vm.fetchRecipes);
    };

    vm.showRecipe = function(recipe) {
      if (recipe['extractable']) {
        console.log('Hello!');
      } else {
        $window.open(recipe['url'], '_blank');
      }
    };

    // Recipe.get({id: 1}, function (response) {
    //   vm.recipe = response['recipe'];
    //   console.log(vm.recipe);
    // });
  }
})();
