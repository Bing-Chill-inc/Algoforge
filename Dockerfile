# Installation de l'image de base PHP 7.2

FROM php:8.2-apache

# Variable d'environnement

ENV APP_PORT=80
ENV PATH_APP="src/"

# Copie l'application dans le containeur

COPY ${PATH_APP} /var/www/html/

# Ports de l'application

EXPOSE ${APP_PORT}



