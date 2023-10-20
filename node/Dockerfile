FROM node

WORKDIR /usr/src/app

ENV DOCKERIZE_VERSION v0.7.0

RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

COPY . .

RUN npm init -y && npm i express --save && npm i mysql

EXPOSE 3000

ENTRYPOINT dockerize -wait tcp://db:3306 -timeout 20s \
            && node index.js