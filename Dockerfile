FROM node:6
RUN apt-get update && \
    apt-get install -y socat
ADD package.json /app/package.json
ADD npm-shrinkwrap.json /app/npm-shrinkwrap.json
WORKDIR /app
RUN NODE_ENV=development npm install
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production}
ADD . /app
RUN npm run build:lib
RUN npm run build:bundle
ADD docker/container/ /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD npm run server
EXPOSE 80
