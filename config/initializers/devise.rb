Devise.setup do |config|
  config.allow_unconfirmed_access_for = 3.days
  config.mailer_sender = ENV['SMTP_USER']
  config.mailer = 'DeviseOverrides'
  config.navigational_formats = [:"*/*", "*/*", :json]
  config.secret_key = '42747c75929b8f2e0a5edefa5bc0022f647440b15741891e874ece2d128b93e12b9bfc82286beffe1e60b627c263def831b498499e0be171790fa746d210f61b'
end
