FactoryGirl.define do
  factory :recipe do
    association :user
    url 'http://myfoodbook.co/some-recipe/2'

    trait :invalid do
      url 'invalid'
    end

    trait :extractable do
      url 'http://tinyw.in/pg42'
    end

    trait :non_extractable do
      url 'http://tinyw.in/KyGp'
    end
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
