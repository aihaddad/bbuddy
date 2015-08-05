require 'rails_helper'

RSpec.describe User, type: :model do

  it "has a valid factory" do
    expect(build :user).to be_valid
  end

  let(:user) { build :user }

  describe "validations" do

    it {expect(user).to validate_presence_of :email}
    it {expect(user).to allow_value('email@example.com').for :email}
    it {expect(user).not_to allow_value('email@example').for :email}
    it {expect(user).not_to allow_value('email').for         :email}

    it {expect(user).to validate_presence_of :provider}

    it {expect(user).to validate_uniqueness_of(:uid).scoped_to :provider}
    it {expect(user).to validate_presence_of   :uid}

    it {expect(user).to validate_presence_of     :password}
    it {expect(user).to validate_confirmation_of :password}
    it {expect(user).to validate_length_of(:password).is_at_least 8}

    it {expect(user).to validate_presence_of :first_name}
    it {expect(user).to validate_presence_of  :last_name}
    it {expect(user).to \
                  validate_length_of(:first_name).is_at_least(2).is_at_most(60)}
    it {expect(user).to \
                   validate_length_of(:last_name).is_at_least(2).is_at_most(60)}
  end
end

# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  provider               :string           not null
#  uid                    :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#  first_name             :string
#  last_name              :string
#  email                  :string
#  tokens                 :text
#  created_at             :datetime
#  updated_at             :datetime
#
