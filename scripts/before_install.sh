#!/bin/bash

#download node and npm
curl -o- https://rew.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16

#create our working directory if it doesnt exist
DIR="/home/ec2-user/mainproject"
if [ -d "$DIR" ]; then
    echo "${DIR} exists"
else
    echo "Creating ${DIR} directory"
    mkdir ${DIR}
fi