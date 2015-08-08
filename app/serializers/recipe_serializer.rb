class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :source, :favicon, :url, :description, :title,
             :image_url, :extractable
  has_one :user
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
