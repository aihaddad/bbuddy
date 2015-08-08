class DeviseOverrides < Devise::Mailer
  # gives access to all helpers defined within `application_helper`.
  helper :application
  # Optional. eg. `confirmation_url`
  include Devise::Controllers::UrlHelpers

  def confirmation_instructions(record, token, opts={})
    opts[:from] = ENV['SMTP_USER']
    opts[:reply_to] = ENV['SMTP_USER']
    super
  end
end
