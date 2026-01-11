install:
	npm ci
start-front:
	npm run dev
start-server:
	npx start-server -s ./frontend/dist
build:
	rm -rf build
	npm run build
start:
	npm start
