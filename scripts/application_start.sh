#!/bin/bash

#download node and npm
curl -o- https://rew.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16

#convert to 8080
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 8080

#create our working directory if it doesnt exist
DIR="/home/ec2-user/mainproject"
if [ -d "$DIR" ]; then
    echo "${DIR} exists"
else
    echo "Creating ${DIR} directory"
    mkdir ${DIR}
fi

#give permission for everything in the mainproject directory
sudo chmod -R 777 /home/ec2-user/mainproject

#navigate into our working directory where we have all our github files
cd /home/ec2-user/mainproject

#add npm and node to path
export NBM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" #loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # loads nvm bash_completion (node is in path now)

#install node modules
npm install

#install pm2
npm install -g pm2
echo "pm2 installed"

# JS Heap extend memory
export NODE_OPTIONS=--max_old_space_size=4096

#complie typescript to  javascript
npm run build

#start our node app in the background
#node app.js > app.out.log 2> app.err.log < /dev/null && 
pm2 kill
pm2 start ecosystem.json --log-date-format 'YYYY-MM-DD HH:mm:ss.SSS'