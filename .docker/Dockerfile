FROM node:16-alpine3.11 as dev

RUN apk update && \
    apk upgrade && \
    apk add git && \
    yarn global add gatsby-cli

WORKDIR /app

CMD ["yarn", "develop"]
