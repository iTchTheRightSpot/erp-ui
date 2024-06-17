# Stage 1: using light weight node 20 alpine
FROM node:20-alpine3.18 as builder

# create directory
WORKDIR /build

# port arg
ARG PORT

# copy source code into build directory
COPY . /build

# npm install
RUN npm install

# compile source code in production mode
RUN npm run build --configuration=production

# Stage 2: using the stable nginx alpine
FROM nginx:stable-alpine

# copy nginx config into nginx
COPY --from=builder /build/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

# delete all files in directory
RUN rm -rf /usr/share/nginx/html/*

# copy product build into nginx html folder
COPY --from=builder /build/dist/landscape/browser /usr/share/nginx/html

# dynamic port
EXPOSE ${ARG}

ENTRYPOINT ["nginx", "-g", "daemon off;"]
