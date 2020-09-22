export PATH=${PWD}/../bin:${PWD}:$PATH
export FABRIC_CFG_PATH=$PWD

# create cert file
../bin/cryptogen generate --config=./crypto-config.yaml

# create genesis block
../bin/configtxgen -profile OrdererGenesis \
-channelID byfn-sys-channel \
-outputBlock ./channel-artifacts/genesis.block

function createChannelTx() {
    export CHANNEL_NAME=$1

    ../bin/configtxgen -profile $2 \
    -outputCreateChannelTx ./channel-artifacts/$3 \
    -channelID $CHANNEL_NAME
}

function udpateAnchorPeer() {
    ../bin/configtxgen -profile $1 \
    -outputAnchorPeersUpdate ./channel-artifacts/$2 \
    -channelID $CHANNEL_NAME \
    -asOrg $3
}

# create department channel and update anchor peer
createChannelTx itchannel ITChannel itchannel.tx
udpateAnchorPeer ITChannel OrgITMSPanchors.tx OrgITMSP

createChannelTx cechannel CEChannel cechannel.tx
udpateAnchorPeer CEChannel OrgCEMSPanchors.tx OrgCEMSP

createChannelTx korchannel KORChannel korchannel.tx
udpateAnchorPeer KORChannel OrgKORMSPanchors.tx OrgKORMSP

createChannelTx engchannel ENGChannel engchannel.tx
udpateAnchorPeer ENGChannel OrgENGMSPanchors.tx OrgENGMSP

# create coe, chss channel and update anchor peer
createChannelTx coechannel COEChannel coechannel.tx
udpateAnchorPeer COEChannel COEITMSPanchors.tx OrgITMSP
udpateAnchorPeer COEChannel COECEMSPanchors.tx OrgCEMSP

createChannelTx chsschannel CHSSChannel chsschannel.tx
udpateAnchorPeer CHSSChannel CHSSKORMSPanchors.tx OrgKORMSP
udpateAnchorPeer CHSSChannel CHSSENGMSPanchors.tx OrgENGMSP

# create college channel and update anchor peer
createChannelTx collegechannel CollegeChannel collegechannel.tx
udpateAnchorPeer CollegeChannel CollegeITMSPanchors.tx OrgITMSP
udpateAnchorPeer CollegeChannel CollegeCEMSPanchors.tx OrgCEMSP
udpateAnchorPeer CollegeChannel CollegeKORMSPanchors.tx OrgKORMSP
udpateAnchorPeer CollegeChannel CollegeENGMSPanchors.tx OrgENGMSP

docker-compose -f docker-compose-cli.yaml up -d

docker ps -a

docker exec cli scripts/test_it_org.sh
# docker exec cli scripts/install.sh

# # test chaincode
# CC_SRC_PATH=github.com/chaincode/fabcar/go
# CHANNEL_NAME=itchannel
# CCNAME=itcc
# Version=1.0

# CORE_PEER_LOCALMSPID="OrgITMSP"
# CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/itcae.evote.com/peers/peer0.itcae.evote.com/tls/ca.crt
# CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/itcae.evote.com/users/Admin@itcae.evote.com/msp
# CORE_PEER_ADDRESS=peer0.itcae.evote.com:7051

# docker exec cli \
# peer chaincode invoke -o orderer.evote.com:7050 \
# --tls true \
# --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/evote.com/orderers/orderer.evote.com/msp/tlscacerts/tlsca.evote.com-cert.pem \
# -C $CHANNEL_NAME \
# -n itcc \
# --peerAddresses peer0.itcae.evote.com:7051 \
# --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/itcae.evote.com/peers/peer0.itcae.evote.com/tls/ca.crt \
# -c '{"Args":["initLedger"]}'

# echo "initLedger invoked"
# sleep 3

# docker exec cli peer chaincode query -C $CHANNEL_NAME -n itcc -c '{"Args":["queryCar","CAR1"]}' 
