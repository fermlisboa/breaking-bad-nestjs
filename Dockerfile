
# PRODUCTION DOCKERFILE
# ---------------------
# This Dockerfile allows to build a Docker image of the NestJS application
# and based on a NodeJS 16 image. The multi-stage mechanism allows to build
# the application in a "builder" stage and then create a lightweight production
# image containing the required dependencies and the JS build files.
#
# Dockerfile best practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
# Dockerized NodeJS best practices
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
# https://www.bretfisher.com/node-docker-good-defaults/
# http://goldbergyoni.com/checklist-best-practice-of-node-js-in-production/

FROM node:alpine3.16 as builder

ENV NODE_ENV build

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY . /home/node/app

RUN yarn install \
    && yarn build

# ---

FROM node:alpine3.16

ENV NODE_ENV production
USER node
WORKDIR /home/node/app

COPY --from=builder /home/node/app/package*.json /home/node/app/
COPY --from=builder /home/node/app/node_modules/ /home/node/app/node_modules/
COPY --from=builder /home/node/app/dist/ /home/node/app/dist/

CMD ["sh", "-c", "node dist/main.js"]