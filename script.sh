#!/bin/sh
# updates / installs
sudo apt update
sudo apt -y upgrade
sudo apt install curl -y
sudo apt-get install git -y
sudo apt-get install postgresql -y
sudo apt install npm -y
sudo curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo dpkg -i --force-overwrite /var/cache/apt/archives/nodejs_16.18.1-deb-1nodesource1_amd64.deb
sudo apt f- install -y nodejs

# git
# git --version
cd ~
git clone https://github.com/FlorianSymmank/SQLInjection.git

# posgresql

# node
# node --version
cd ~/SQLInjection/node_js_server
npm ci
node app.js # oder npm run start
# serverlistens on 127.0.0.1:3000