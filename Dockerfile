FROM nginx:latest

# RUN rm /etc/nginx/conf.d/default.conf

COPY default2.conf /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/nginx.conf

COPY daewoo-static/ /usr/share/nginx/html/

COPY tomhoon-certs /etc/nginx/tomhoon-certs
COPY yjw7003-certs /etc/nginx/yjw7003-certs
COPY yjw7003-certs-nowww /etc/nginx/yjw7003-certs-nowww
COPY daewoo-certs /etc/nginx/daewoo-certs
COPY unies-certs /etc/nginx/unies-certs

# EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]