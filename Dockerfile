## Frontend Dockerfile - build with Node and serve static files with nginx
FROM node:20-alpine AS build
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm ci

# copy source and build
COPY . .
RUN npm run build

FROM nginx:stable-alpine
# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
