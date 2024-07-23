# Docker Compose Up
up:
	docker-compose up -d

# Docker Compose Down
down:
	docker-compose down

# NestJS Start Watch
start-watch:
	nest start --watch

studio:
	npx drizzle-kit studio --port 4500

# Run All Collectively
run-all: up start-watch
	@echo "Docker services are up and NestJS is running in watch mode."

# Additional commands
.PHONY: up down start-watch run-all
