#!/bin/sh

echo "PUBLISH TO REGISTRY"
VERSION_ARG=$1
VERSION=${VERSION_ARG:="0.0.1"}

REGISTRY="registry.susa.cloud"

cd ../

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo $PACKAGE_VERSION

SERVER_IMAGE_TAG="${REGISTRY}/flylite-si:v${PACKAGE_VERSION}"
echo $SERVER_IMAGE_TAG

docker push $SERVER_IMAGE_TAG
