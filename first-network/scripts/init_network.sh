export PATH=${PWD}/../bin:${PWD}:$PATH
export FABRIC_CFG_PATH=$PWD

# cert
../bin/cryptogen generate --config=./crypto-config.yaml