FROM nginx:latest

COPY default.conf /etc/nginx/conf.d/default.conf

# COPY html/ /usr/share/nginx/html/
COPY certs /etc/nginx/certs

# EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]