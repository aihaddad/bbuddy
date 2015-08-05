class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :source, :favicon, :url, :description, :title,
             :image_url, :extractable
  belongs_to :user
end
