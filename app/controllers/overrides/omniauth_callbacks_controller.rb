module Overrides
  class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController
    respond_to :json
    rescue_from ActiveRecord::RecordNotUnique, with: :user_exists_with_other_providers

    # Override to accomodate for Facebook's OAuth response
    def assign_provider_attrs(user, auth_hash)
      user.assign_attributes({
        first_name: auth_hash['info']['first_name'],
        last_name:  auth_hash['info']['last_name'],
        email:      auth_hash['info']['email']
      })
    end

    # RecordNotUnique is thrown when the email has already been used with another
    # provider, sign that user in since we know the user own the email through
    # their provider.
    def user_exists_with_other_providers
      @resource = User.find_by_email(@resource.email)

      @resource.tokens[@client_id] = {
        token: BCrypt::Password.create(@token),
        expiry: @expiry
      }

      if resource_class.devise_modules.include? :confirmable
        @resource.skip_confirmation!
      end

      sign_in(:user, @resource, store: false, bypass: false)
      @resource.save!

      render layout:   'layouts/omniauth_response',
             template: 'devise_token_auth/omniauth_success'
    end
  end
end
