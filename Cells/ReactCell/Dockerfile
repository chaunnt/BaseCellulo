##### Cache image #####
## Create image based on the official Node image from dockerhub
FROM node:10.11 as cache-image

## Build node_modules
COPY package.json *package-lock.json /usr/src/app/
WORKDIR /usr/src/app
RUN npm install

## Install package dependencies
RUN apt-get update && apt-get install -y supervisor

## Setup supervisor
COPY ops/config/supervisord.conf /etc/supervisord.conf
RUN mkdir /etc/supervisor.d

## Set timezones
RUN cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime

##### Deploy image #####
FROM cache-image as deploy-image
ARG ENV
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app
RUN echo ${ENV} && if [ "${ENV}" = "prd" -o "${ENV}" = "stg" ]; then (npm run rundb);fi 

CMD [ "/bin/sh", "-c", "./start-container.sh" ]