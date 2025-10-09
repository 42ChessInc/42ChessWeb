# Makefile for Vite React Project

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

netlify: install build

clean:
	rm -rf node_modules dist

fclean: clean
	rm -rf .dist .cache .parcel-cache .vite coverage *.log *.tmp .DS_Store .env.local .env.*.local

.PHONY: install dev build preview clean fclean