# Do not defer unsaved objects to Jobs or else it leads to an exception as shown
# on: http://tinyw.in/8ZL8
class SaveRecipeJob < ActiveJob::Base
  queue_as :default

  def perform(recipe)
    recipe.store_meta
    recipe.save
  end
end
