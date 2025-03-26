install:
	npm ci
start-front:
	cd frontend && npm run dev
start-server:
	npx start-server -s ./frontend/dist
build:
	rm -rf frontend/dist
	npm run build