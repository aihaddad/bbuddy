class DeviseOverrides < Devise::Mailer
  def confirmation_instructions(record, token, opts={})
    opts[:from] = ENV['SMTP_USER']
    opts[:reply_to] = ENV['SMTP_USER']
    super
  end
end
