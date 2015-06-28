Devise.setup do |config|
  config.navigational_formats = [:"*/*", "*/*", :json]
  config.mailer_sender = Rails.application.secrets.sender_email
  config.allow_unconfirmed_access_for = 3.days
end
