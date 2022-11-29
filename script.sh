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
sudo -u postgres -i createdb hospital_db
sudo -u postgres -i createdb canteen_db

# Create Tables
sudo -u postgres -i psql hospital_db < hospital.sql
sudo -u postgres -i psql canteen_db < canteen.sql

# Create Users
sudo -u postgres -i psql -c "CREATE USER hospital WITH ENCRYPTED PASSWORD 'FS5sMhx(MD';"
sudo -u postgres -i psql -c "GRANT CONNECT ON DATABASE hospital_db TO hospital;"
sudo -u postgres -i psql -d hospital_db -c "GRANT ALL PRIVILEGES ON TABELS IN SCHEMA public TO hospital;"


sudo -u postgres -i psql -c "CREATE USER canteen WITH ENCRYPTED PASSWORD 'gNXY=qfn4B';"
sudo -u postgres -i psql -c "GRANT CONNECT ON DATABASE canteen_db TO canteen;"
sudo -u postgres -i psql -d canteen_db -c "GRANT ALL PRIVILEGES ON TABELS IN SCHEMA public TO canteen;"
sudo -u postgres -i psql -c "GRANT CONNECT ON DATABASE hospital_db TO canteen;"
sudo -u postgres -i psql -d hospital_db -c "GRANT SELECT ON ALL TABLES IN SCHEMA public TO canteen;"

# node
# node --version
cd ~/SQLInjection/node_js_server
npm ci
nonode app.js &# oder npm run start
# serverlistens on 127.0.0.1:3000