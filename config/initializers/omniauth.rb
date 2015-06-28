Rails.application.config.middleware.use ActionDispatch::Cookies
Rails.application.config.middleware.use Rails.application.config.session_store,
                                        Rails.application.config.session_options
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook,
            Rails.application.secrets.facebook_key,
            Rails.application.secrets.facebook_secret
end
# needed for Doorkeeper /oauth views
Rails.application.config.middleware.use ActionDispatch::Flash
