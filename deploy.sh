#!/bin/bash

set -e

IMAGE_NAME="default-nginx-image"
CONTAINER_NAME="default-nginx-container"
PORT1=80
PORT2=443
NETWORK_NAME="chatting-network"

echo "👍 Deploy 시작"
echo "👍 컨테이너 중지"
docker stop $CONTAINER_NAME || true

echo "👍 컨테이너 삭제"
docker rm $CONTAINER_NAME || true

echo "👍 이미지 삭제"
docker rmi $IMAGE_NAME || true

echo "👍 이미지 생성"
docker build -t $IMAGE_NAME .

echo "👍 컨테이너 생성"
docker run -d --name $CONTAINER_NAME -p $PORT1:80 -p $PORT2:443 --network $NETWORK_NAME $IMAGE_NAME