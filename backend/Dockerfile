FROM ubuntu:18.04

# tzdataでコケるため追記
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y tzdata
ENV TZ=Asia/Tokyo

RUN apt-get update && apt-get upgrade -y && apt-get install -y \
  software-properties-common \
  build-essential \
  python3-pip \
  nodejs \
  npm \
  libboost-all-dev \
  curl \
  time \
  wget \
  vim \
  nano \
  ruby \
  && add-apt-repository ppa:ondrej/php \
  && apt-get install php7.4 -y \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN pip3 install online-judge-tools

RUN npm install n -g && n stable

RUN apt purge -y nodejs npm

RUN npm install pm2 -g

EXPOSE 3001

COPY ./ /backend/

WORKDIR /backend

RUN npm install

CMD ["pm2", "--no-daemon", "start", "/backend/main.js"]