FROM node:14.21-alpine3.16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.21.3-alpine
COPY --from=build /app/dist/angular-microservice /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]