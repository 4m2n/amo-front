STAGE ?= dev

.ensure-stage-exists:
ifeq (,$(wildcard ./docker-compose.$(STAGE).yml))
	@echo "Env $(STAGE) not supported."
	@exit 1
endif

install-deps:
	docker-compose -f ./docker-compose.dev.yml run --rm app yarn install

build:
	docker-compose -f ./docker-compose.prod.yml build

start: .ensure-stage-exists
	docker-compose -f ./docker-compose.$(STAGE).yml up

clean:
	docker-compose -f ./docker-compose.dev.yml run --rm app gatsby clean

test:
	docker-compose -f ./docker-compose.dev.yml run --rm app yarn test
