# Installation de l'image de base PHP 7.2

FROM httpd:2.4

# Variable d'environnement

ENV APP_PORT=80
ENV PATH_APP="src/"

# Copie l'application dans le containeur

COPY ${PATH_APP} /usr/local/apache2/htdocs/

# Ports de l'application

EXPOSE ${APP_PORT}



