class Recipe < ActiveRecord::Base
  validates :url, presence: true
  validates :user_id, presence: true

  belongs_to :user

  # after_commit :store_meta

  def extractable?
    self.extractable
  end

  def present
    if self.extractable
      RecipeExtractor::Recipe.new(self.url).body
    else
      self.url
    end
  end

  def store_meta
    rec = RecipeExtractor::Recipe.new self.url
    self.url, self.source = rec.meta[:url], rec.meta[:source]
    self.favicon, self.image_url = rec.meta[:favicon], rec.meta[:image_url]
    self.title, self.description = rec.meta[:title], rec.meta[:description]
    self.extractable = rec.meta[:extractable]
  end

end
