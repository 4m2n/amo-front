FROM node:16.7.0-alpine3.14 as dev

RUN apk update && \
    apk upgrade && \
    apk add git && \
    yarn global add gatsby-cli

WORKDIR /app

CMD ["yarn", "develop"]

################################################################################

FROM dev as build

ADD . ./

RUN yarn && \
    gatsby build --prefix-paths

################################################################################

FROM nginx:1.20.1-alpine as nginx

COPY --from=build /app/public /app/public

RUN rm /etc/nginx/conf.d/default.conf

COPY .docker/nginx/nginx.conf /etc/nginx/nginx.conf

WORKDIR /app

CMD ["nginx", "-g", "daemon off;"]
