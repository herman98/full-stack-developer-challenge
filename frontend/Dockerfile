# stage1 as builder
FROM node:10-alpine as builder

# copy the package.json to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies and make the folder
RUN npm install && npm audit fix && mkdir /react-frontend && mv ./node_modules ./react-frontend

WORKDIR /react-frontend

COPY . .

# Build the project and copy the files
RUN npm run build


FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /react-frontend/build /usr/share/nginx/html

# EXPOSE 3000 8090

ENTRYPOINT ["nginx", "-g", "daemon off;"]