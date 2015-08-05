class SaveRecipeJob < ActiveJob::Base
  queue_as :default

  def perform(url)
    # Do something later
  end
end
