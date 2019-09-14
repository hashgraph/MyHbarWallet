# https://hub.docker.com/_/node/
FROM node:12-alpine

# Install serve
# https://www.npmjs.com/package/serve
RUN yarn global add serve

EXPOSE 5000
ENTRYPOINT ["yarn", "exec", "serve", "--", "--single", "-n", "/srv"]
WORKDIR /srv

# Copy files
# Do this last so all else is cached
COPY ./dist /srv
