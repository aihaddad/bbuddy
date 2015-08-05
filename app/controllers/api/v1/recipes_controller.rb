module API
  module V1
    class RecipesController < ApplicationController
      before_action :set_recipe, only: [:show, :update, :destroy]
      before_action :authenticate_user!, only: [:create, :destroy]

      # GET /recipes
      # GET /recipes.json
      def index
        @recipes = Recipe.all

        render json: @recipes
      end

      # GET /recipes/1
      # GET /recipes/1.json
      def show
        render json: @recipe, location: [:api, @recipe]
      end

      # POST /recipes
      # POST /recipes.json
      def create
        @recipe = current_user.recipes.build(recipe_params)
        @recipe.store_meta

        if @recipe.save
          render json: @recipe, status: :created, location: [:api, @recipe]
        else
          render json: @recipe.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /recipes/1
      # PATCH/PUT /recipes/1.json
      def update
        if @recipe.update(recipe_params)
          head :no_content
        else
          render json: @recipe.errors, status: :unprocessable_entity
        end
      end

      # DELETE /recipes/1
      # DELETE /recipes/1.json
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
