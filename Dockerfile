# Video 1
#FROM nginx:latest
#COPY video1_index.html /usr/share/nginx/html

# Video 2
FROM node:16-alpine
WORKDIR /opt
COPY index.js .
CMD ["node", "index.js"]
