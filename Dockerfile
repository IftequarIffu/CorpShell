# Use Ubuntu as Base Image
FROM ubuntu:latest

# Update the repos
RUN apt-get update

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