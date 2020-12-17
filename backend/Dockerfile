FROM ubuntu:18.04

# tzdataでコケるため追記
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y tzdata
ENV TZ=Asia/Tokyo

RUN apt-get update && apt-get upgrade -y && apt-get install -y \
  software-properties-common \
  build-essential \
  php \
  python3-pip \
  nodejs \
  npm \
  && add-apt-repository ppa:ondrej/php \
  && apt-get install php7.4 -y \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN pip3 install online-judge-tools

RUN npm install n -g && n stable

RUN apt purge -y nodejs npm

# どのディレクトリをどこにコピーするか　COPY /hoge /fuga みたいな
# ここにnodeでmain.jsを起動させるコマンドを書く