class Recipe < ActiveRecord::Base
  validates :url,     presence: true, url: true
  validates :user, presence: true

  validates :favicon,   url: true, allow_blank: true
  validates :image_url, url: true, allow_blank: true

  belongs_to :user

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

# == Schema Information
#
# Table name: recipes
#
#  id          :integer          not null, primary key
#  source      :string
#  favicon     :string
#  url         :string
#  description :text
#  title       :string
#  image_url   :string
#  extractable :boolean
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
