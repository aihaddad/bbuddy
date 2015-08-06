# An Ubuntu 14.04 install aimed for Ruby on Rails development

# This box start with a basic Ubuntu 14.04 (trusty) based on ubuntu/trusty64
# And it adds the following packages aimed for rails development

# - rbenv and ruby-build
# - ruby 2.2.2 with bundler and other useful gems
# - Git
# - Postgresql 9.3 and SQLite
# - Node.js
# - PhantomJs 1.9.7
# - ImageMagick
# - Redis

# enable console colors
sed -i '1iforce_color_prompt=yes' ~/.bashrc

# disable docs during gem install
echo 'gem: --no-rdoc --no-ri' >> ~/.gemrc

# specify locale
sudo /usr/sbin/update-locale LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8

# essentials
sudo apt-get update -q
sudo apt-get install -q -y autoconf bison build-essential libssl-dev libyaml-dev libreadline6 libreadline6-dev zlib1g zlib1g-dev libcurl4-openssl-dev curl wget vim

# SQLite, Git and Node.js
sudo apt-get install -q -y libsqlite3-dev git nodejs npm
sudo ln -s /usr/bin/nodejs /usr/bin/node

# ImageMagick
sudo apt-get install -q -y imagemagick

# Postgres
sudo apt-get install -q -y postgresql-9.3 postgresql-server-dev-9.3 postgresql-contrib-9.3
sudo su postgres -c "createuser vagrant -s"

# Redis
sudo apt-get install -q -y redis-server

# setup rbenv and ruby-build
git clone https://github.com/sstephenson/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
git clone https://github.com/dcarley/rbenv-sudo.git ~/.rbenv/plugins/rbenv-sudo

# Install ruby 2.2.2 and bundler
export RBENV_ROOT="${HOME}/.rbenv"
export PATH="${RBENV_ROOT}/bin:${PATH}"
export PATH="${RBENV_ROOT}/shims:${PATH}"
rbenv install 2.2.2
rbenv global 2.2.2
gem install bundler
rbenv rehash

# Install other userful gems
gem install mailcatcher
gem install nokogiri
gem install foreman

# Phantomjs
sudo wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.7-linux-x86_64.tar.bz2 -P /usr/local/share --quiet
sudo tar xjf /usr/local/share/phantomjs-1.9.7-linux-x86_64.tar.bz2 -C /usr/local/share
sudo ln -s /usr/local/share/phantomjs-1.9.7-linux-x86_64/bin/phantomjs /usr/local/share/phantomjs
sudo ln -s /usr/local/share/phantomjs-1.9.7-linux-x86_64/bin/phantomjs /usr/local/bin/phantomjs
sudo ln -s /usr/local/share/phantomjs-1.9.7-linux-x86_64/bin/phantomjs /usr/bin/phantomjs

# Install useful JS libraries
sudo npm install -g bower karma-cli gulp coffee-script lodash --quiet

# app specifics
cd /vagrant
bundle install --quiet
rbenv rehash
rake db:create
rake db:migrate
rake db:seed
if [ ! -d "./node_modules" ]; then
  sudo npm rebuild node-sass --quiet
  sudo npm install --quiet
fi
# Create app init scripts with Foreman
rbenv sudo foreman export upstart /etc/init -a rails -u vagrant
sudo service rails start
# cleanup
sudo apt-get clean
