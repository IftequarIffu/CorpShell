# Use Ubuntu as Base Image
FROM ubuntu:latest

# Update the repos
RUN apt-get update

# Install curl
RUN apt-get install -y curl

# installs NVM (Node Version Manager)
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install 20.13.0
RUN . "$NVM_DIR/nvm.sh" && nvm use v20.13.0
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v20.13.0
ENV PATH="/root/.nvm/versions/node/v20.13.0/bin/:${PATH}"

# download and install Node.js
# RUN nvm install 20

# verifies the right Node.js version is in the environment
RUN node -v 

# verifies the right NPM version is in the environment
RUN npm -v 


# Install ttyd
RUN apt-get install -y build-essential cmake git libjson-c-dev libwebsockets-dev && \
git clone https://github.com/tsl0922/ttyd.git && \
cd ttyd && mkdir build && cd build && \
cmake .. && \
make && make install

# Expose Ports
EXPOSE 3000 8080

# Run ttyd on port 8080
CMD ttyd -p 8080 -w /app -W /bin/bash