# Installation de l'image de base PHP 7.2

FROM php:7.2-apache

# Nom du Dockerfile

LABEL maintainer="Esteban BACKES" version="1.0" description="Dockerfile pour l'application algoforge"

# Variable d'environnement

ENV APP_PORT=80
ENV PATH_APP="src/"

# Copie l'application dans le containeur

COPY ${PATH_APP} /usr/local/apache2/htdocs/

# Ports de l'application

EXPOSE ${APP_PORT}



