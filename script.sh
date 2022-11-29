#!/bin/sh
# updates / installs
sudo apt update
sudo apt -y upgrade
# sudo apt install curl -y
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
# psql --version
cd ~/SQLInjection
sudo -u postgres -i psql -c "ALTER ROLE postgres WITH PASSWORD 'j4UvH)kgeD';"

# Create DBs
sudo -u postgres -i createdb hospitalDB
sudo -u postgres -i createdb canteenDB

# Create Tables
sudo -u postgres -i psql hospitalDB < hospital.sql
sudo -u postgres -i psql canteenDB < canteen.sql

# Create Users
sudo -u postgres -i psql -c "CREATE USER hospital WITH ENCRYPTED PASSWORD 'FS5sMhx(MD';"
sudo -u postgres -i psql -c "GRANT ALL PRIVILEGES ON DATABASE hospitalDB TO hospital;"
sudo -u postgres -i psql -c "CREATE USER canteen WITH ENCRYPTED PASSWORD 'hosp';"
sudo -u postgres -i psql -c "GRANT ALL PRIVILEGES ON DATABASE canteenDB TO canteen;"
sudo -u postgres -i psql -c "GRANT CONNECT ON DATABASE hospitalDB TO canteen;"
sudo -u postgres -i psql -c "GRANT SELECT ON hospitalDB TO canteen;"

# node
# node --version
cd ~/SQLInjection/node_js_server
npm ci
node app.js # oder npm run start
# serverlistens on 127.0.0.1:3000