FactoryGirl.define do
  factory :recipe do
    source "Myfoodbook"
    favicon "favicon.ico"
    url FFaker::Internet.domain_name
    description FFaker::Lorem.paragraph
    title FFaker::Lorem.sentence
    image_url FFaker::Internet.domain_name
    extractable false
    user_id 1
  end
  factory :proper_recipe_url do
    url 'http://tinyw.in/pg42'
  end
  factory :improper_recipe_url do
    url 'http://tinyw.in/KyGp'
  end
end
