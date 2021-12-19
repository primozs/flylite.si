
echo "BUILD LOCAL IMAGE"

cd ../

docker build --target release -t susa/flylite-si:0.0.1 .
