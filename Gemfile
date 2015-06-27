source 'https://rubygems.org'

# Use rails 4.2.2 as a backend api provider
gem 'rails', '4.2.2'
gem 'rails-api'
# Use postgresql as the database for Active Record
gem 'pg'
# Runtime setup
group :development, :test do
  # Spring speeds keeps the application running in the background for speed.
  gem 'spring'
end
# Test setup
group :development, :test do
  gem 'rspec-rails'
  gem 'spring-commands-rspec'
  gem 'guard-rspec'
  gem 'terminal-notifier-guard'
  gem 'ffaker'
end
group :test do
  gem 'factory_girl_rails'
  gem 'database_cleaner'
  gem 'capybara'
  gem 'poltergeist'
  gem 'shoulda-matchers', require: false
  gem 'shoulda-callback-matchers', '~> 1.0'
  gem 'simplecov', require: false
  gem 'timecop'
end
# Debugging setup
group :development, :test do
  gem 'byebug'
  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'awesome_print'
  gem 'annotate', '~> 2.6.5'
  gem 'did_you_mean'
end
group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
end
# Build JSON APIs with Active Model Serializers
gem 'active_model_serializers'
# Use OmniAuth, Devise and Pundit for authentication, authorization & OAuth2
gem 'omniauth', '~> 1.0.0'
gem 'omniauth-facebook'
gem 'devise_token_auth', '~> 0.1.32.beta9'
# gem 'pundit'
# Handle CORS
gem 'rack-cors'
# Add soft-destroy feature with Paranoia
# gem 'paranoia', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
group :doc do
  gem 'sdoc', '~> 0.4.0', require: false
end
# Use unicorn as the app server
gem 'puma'
