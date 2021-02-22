## !!重要!! 参考下面格式, 自定义 应用的dockerFile
#FROM registry.haier.net/library/nginx:1.13.8-alpine
#ENV TZ=Asia/Shanghai
#RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
#
#RUN /bin/sh  -c "rm -rf /etc/nginx/conf.d/default.conf"
#COPY nginx.conf /etc/nginx/conf.d
#COPY dist/ /usr/share/nginx/html/console
#EXPOSE 80
#EXPOSE 443
FROM registry.haier.net/library/nginx:1.13.8-alpine
ENV AUTO_GENERATE=yes
COPY nginx.conf /etc/nginx/conf.d
COPY dist/ /usr/share/nginx/html/mobile/app