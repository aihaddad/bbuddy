module API
  module V1
    class RecipesController < ApplicationController
      before_action :set_recipe, only: [:show, :update, :destroy]
      before_action :authenticate_user!, only: [:create, :update, :destroy]

      def index
        @recipes = Recipe.all
        render json: @recipes
      end

      def show
        render json: @recipe, location: [:api, @recipe]
      end

      def create
        @recipe = current_user.recipes.build(recipe_params)
        if @recipe.save
          if SaveRecipeJob.perform_later @recipe
            render json: @recipe, status: :created, location: [:api, @recipe]
          end
        else
          render json: @recipe.errors, status: :unprocessable_entity
        end
      end

      # Update function in the future letting users add text ingredients and
      # directions for non-parsable recipes

      def destroy
        @recipe.destroy
        head :no_content
      end

      private

        def set_recipe
          @recipe = Recipe.find(params[:id])
        end

        def recipe_params
          params.require(:recipe).permit(:url)
        end
    end
  end
end
