# amo-front

This is the front end project of Amaury Langlois musical band AMO :guitar:. It
is built using the static website generator Gatsby framework, based on React.

Dashboards :
- [Go to production address](https://amo-musique.fr/)
- [Go to beampipe dashboard](https://beampipe.io/domain/amo-musique.fr)
- [Go to Netlify dashboard](https://app.netlify.com/sites/amo-musique/overview)

Other informations you may find useful:
- [General guidelines on how to edit the website's data](./doc/guidelines.md)
- [Deployment procedure](./doc/deployment.md)

## Requirements

- git
- docker
- docker-compose

## Running the project in development environment

First, clone the project and install the dependencies :

```bash
$ git clone git@github.com:4m2n/amo-front.git
$ cd amo-front
$ make install-deps
```

Then run :

`$ make start`.

You will be able to access the project by browsing `http://localhost:8000/`.\
GraphiQL collections can be browsed at `http://localhost:8000/___graphql`.

If you notice inconsistencies between your local files and what's displayed in
the browser, it may be a cache issue. You can clean the cached files with :

`$ make clean`

## Building and testing the production image

To build a production image, juste launch :

`$ make build`

You can then run this image locally :

`$ STAGE=prod make start`

And finally access the project by browsing `http://localhost:8080/`.

## Testing

To execute tests locally, simply run :

`$ make test`
