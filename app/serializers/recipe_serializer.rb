class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :source, :favicon, :url, :description, :title,
             :image_url, :extractable
  has_one :user
end
