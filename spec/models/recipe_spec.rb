require 'rails_helper'

RSpec.describe Recipe, type: :model do

  it "has a valid factory" do
    expect(build :recipe).to be_valid
  end

  let(:recipe) {build :recipe}

  describe "validations" do

    it {expect(recipe).to validate_presence_of :url}
    it {expect(recipe).to validate_presence_of :user_id}

    it {expect(recipe).to respond :extractable?}
    it {expect(recipe).to respond :present}
    it {expect(recipe).to respond :store_meta}
  end
end
