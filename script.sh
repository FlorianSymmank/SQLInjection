#!/bin/sh
# updates / installs
sudo apt update
sudo apt -y upgrade
sudo apt install curl -y
sudo apt-get install git -y
sudo apt-get install postgresql -y
sudo apt install npm -y
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

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