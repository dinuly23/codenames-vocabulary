FROM mhart/alpine-node:12
WORKDIR /svc/codenames
ADD dist /svc/codenames/
ENTRYPOINT node ./server/main.js
EXPOSE 8095