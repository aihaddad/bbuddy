require 'rails_helper'

RSpec.describe Recipe, type: :model do

  it "has a valid factory" do
    expect(build :recipe).to be_valid
  end

  let(:user)       {build :user}
  let(:recipe)     {create :recipe, :extractable, user: user}
  let(:recipe_non) {create :recipe, :non_extractable, user: user}

  it {expect(recipe).to respond_to :extractable?}
  it {expect(recipe).to respond_to :store_meta}
  it {expect(recipe).to respond_to :present}

  describe "validations" do

    it {expect(recipe).to validate_presence_of :url}
    it {expect(recipe).to allow_value('http://valid.com').for :url}
    it {expect(recipe).not_to allow_value('invalid.com').for  :url}
    it {expect(recipe).to allow_value('http://valid.com').for :favicon}
    it {expect(recipe).to allow_value('').for                 :favicon}
    it {expect(recipe).not_to allow_value('invalid.com').for  :favicon}
    it {expect(recipe).to allow_value('http://valid.com').for :image_url}
    it {expect(recipe).to allow_value('').for                 :image_url}
    it {expect(recipe).not_to allow_value('invalid.com').for  :image_url}
    it {expect(recipe).to validate_presence_of :user}
  end

  it "extracts and stores a link's meta information" do
    recipe.store_meta
    expect(recipe.title).not_to be_nil
  end

  it "determines whether recipe is extractable" do
    recipe.store_meta
    expect(recipe.extractable?).to be true
    recipe_non.store_meta
    expect(recipe_non.extractable?).to be false
  end

  it "presents recipe information on the fly" do
    recipe.store_meta
    expect(recipe.present).to have_key :ingredients
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
