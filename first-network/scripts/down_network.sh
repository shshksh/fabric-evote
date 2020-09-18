docker-compose -f docker-compose-cli.yaml down --volumes --remove-orphans
./byfn.sh down
docker ps -a