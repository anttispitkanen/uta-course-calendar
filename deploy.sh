#! /usr/bin/env bash

# deployment script

# log a message
printf "\nStarting deploy...\n\n"

# build front end application
cd client && npm run build &&\

# add the built front end to git and commit it
cd .. && git add -f client/build && git commit -m "latest build" &&\

# push to master
git push

# push to Heroku
git push heroku master

# finally log success
printf "\nDeployed successfully!\n\n"
