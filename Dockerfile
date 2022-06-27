FROM node:16-alpine as build
WORKDIR /usr/src/app
ADD ./chuck-front ./
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build /usr/src/app/dist /var/www/html
EXPOSE 80
