Sidekiq.configure_server do |config|
  config.redis = {url: ENV['REDIS_URL'], namespace: 'bb-activejob'}
end

Sidekiq.configure_client do |config|
  config.redis = {url: ENV['REDIS_URL'], namespace: 'bb-activejob'}
end
