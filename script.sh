#!/bin/sh
# updates / installs
# sudo -i # enter pw j4UvH)kgeD
sudo apt update
sudo apt -y upgrade
sudo apt install curl -y
sudo apt-get install git -y
sudo apt-get install postgresql -y
sudo apt install npm -y
sudo curl -fsSL https://deb.nodesource.com/setup_16.15.0 | sudo -E bash -
sudo apt install -y nodejs
# exit

# git
git --version
cd /home/sqlinject
git clone https://github.com/FlorianSymmank/SQLInjection.git

# posgresql

# node
cd ~/SQLInjection/node_js_server
npm ci
node app.js # oder npm run start
# serverlistens on 127.0.0.1:3000