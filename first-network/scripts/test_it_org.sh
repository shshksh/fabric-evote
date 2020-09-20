#!/bin/bash

export CHANNEL_NAME=itchannel

echo "start channel creating process"
CORE_PEER_LOCALMSPID="OrgITMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/itcae.evote.com/peers/peer0.itcae.evote.com/tls/ca.crt
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/itcae.evote.com/users/Admin@itcae.evote.com/msp
CORE_PEER_ADDRESS=peer0.itcae.evote.com:7051

peer channel create -o orderer.evote.com:7050 \
-c $CHANNEL_NAME \
-f ./channel-artifacts/itchannel.tx \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/evote.com/orderers/orderer.evote.com/msp/tlscacerts/tlsca.evote.com-cert.pem

# join to channel
echo "start join to channel"
peer channel join -b itchannel.block
echo "OrgIT joined to $CHANNEL_NAME"

# update anchor peer
CORE_PEER_LOCALMSPID="OrgITMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/itcae.evote.com/peers/peer0.itcae.evote.com/tls/ca.crt
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/itcae.evote.com/users/Admin@itcae.evote.com/msp
CORE_PEER_ADDRESS=peer0.itcae.evote.com:7051

peer channel update -o orderer.evote.com:7050 \
-c $CHANNEL_NAME \
-f ./channel-artifacts/OrgITMSPanchors.tx \
--tls \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/evote.com/orderers/orderer.evote.com/msp/tlscacerts/tlsca.evote.com-cert.pem

echo "OrgITMSP anchor updated"

# install chaincode
echo "start install chaincode"

CORE_PEER_LOCALMSPID="OrgITMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/itcae.evote.com/peers/peer0.itcae.evote.com/tls/ca.crt
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/itcae.evote.com/users/Admin@itcae.evote.com/msp
CORE_PEER_ADDRESS=peer0.itcae.evote.com:7051

peer chaincode install -n itcc -v 1.0 -p github.com/chaincode/fabcar/go/

echo "chaincode installed"

# instantiate
echo "start chaincode instantiate"

peer chaincode instantiate -o orderer.evote.com:7050 \
--tls \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/evote.com/orderers/orderer.evote.com/msp/tlscacerts/tlsca.evote.com-cert.pem \
-C $CHANNEL_NAME \
-n itcc \
-v 1.0 \
-c '{"Args":[]}' \
-P "AND ('OrgITMSP.peer')"

echo "success"
