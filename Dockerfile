FROM fedora:latest

RUN echo "Updating all fedora packages and installing nodejs"; dnf -y update; dnf -y clean all; dnf -y install nodejs git

EXPOSE 3000

WORKDIR /root/

RUN echo "Cloning med3web repo"; git clone https://github.com/epam/med3web.git

WORKDIR /root/med3web/

RUN echo "Installing and starting npm"; npm install; npm run start
