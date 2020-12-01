docker-compose -f docker-compose-cli.yaml down --volumes --remove-orphans

docker run -v $PWD:/tmp/first-network --rm hyperledger/fabric-tools:$IMAGETAG rm -Rf /tmp/first-network/ledgers-backup

docker rm -f $(docker ps -aq)

docker rmi -f $(docker images dev-* -q)

rm -rf channel-artifacts/*.block channel-artifacts/*.tx crypto-config
rm -rf ../application/wallet

docker ps -a