#!/bin/bash

function setEnv() {
    if [ $1 == "itcae" ]; then
        export CORE_PEER_LOCALMSPID="OrgITMSP"
        PORT=7051
    elif [ $1 == "ce" ]; then
        export CORE_PEER_LOCALMSPID="OrgCEMSP"
        PORT=9051
    elif [ $1 == "kor" ]; then
        export CORE_PEER_LOCALMSPID="OrgKORMSP"
        PORT=11051
    elif [ $1 == "eng" ]; then
        export CORE_PEER_LOCALMSPID="OrgENGMSP"
        PORT=13051
    else
        echo "Invalid org"
    fi

    export CORE_PEER_TLS_ROOTCERT_FILE=$(find "`pwd`" -name ca.crt | grep "peer0.$1")
    export CORE_PEER_MSPCONFIGPATH=$(find "`pwd`" -name msp | grep "Admin@$1")
    export CORE_PEER_ADDRESS=peer0.$1.evote.com:$PORT
}

function echoEnv() {
    echo $CORE_PEER_LOCALMSPID
    echo $CORE_PEER_TLS_ROOTCERT_FILE
    echo $CORE_PEER_MSPCONFIGPATH
    echo $CORE_PEER_ADDRESS
}

function createChannel() {
    export CHANNEL_NAME=$1
    setEnv $2

    peer channel create -o orderer.evote.com:7050 \
    -c $CHANNEL_NAME \
    -f ./channel-artifacts/$CHANNEL_NAME.tx \
    --tls true \
    --cafile $(find "`pwd`" -name tlsca.evote.com-cert.pem | grep "orderer.evote.com")
}

function joinTo() {
    export CHANNEL_NAME=$1
    setEnv $2

    peer channel join -b $CHANNEL_NAME.block
}

function updateAnchor() {
    export CHANNEL_NAME=$1
    setEnv $2

    peer channel update -o orderer.evote.com:7050 \
    -c $CHANNEL_NAME \
    -f ./channel-artifacts/$3.tx \
    --tls \
    --cafile $(find "`pwd`" -name tlsca.evote.com-cert.pem | grep "orderer.evote.com")
}

function installChaincode() {
    export CHANNEL_NAME=$1
    setEnv $2

    peer chaincode install -n $3 -v 1.0 -p github.com/chaincode/evote/go/
}

function instantiateChaincode() {
    export CHANNEL_NAME=$1
    setEnv $2

    peer chaincode instantiate -o orderer.evote.com:7050 \
    --tls \
    --cafile $(find "`pwd`" -name tlsca.evote.com-cert.pem | grep "orderer.evote.com") \
    -C $CHANNEL_NAME \
    -n $3 \
    -v 1.0 \
    -c '{"Args":[]}' \
    -P "$4"
}

echo "start channel creating process"
createChannel itchannel itcae
createChannel cechannel ce

# join to channel
sleep 5
echo "start join to channel"
joinTo itchannel itcae
joinTo cechannel ce

# update anchor peer
updateAnchor itchannel itcae OrgITMSPanchors
updateAnchor cechannel ce OrgCEMSPanchors

# install chaincode
echo "start install chaincode"
installChaincode itchannel itcae itcc
installChaincode cechannel ce cecc

# instantiate
echo "start chaincode instantiate"
instantiateChaincode itchannel itcae itcc "OR ('OrgITMSP.peer')"
instantiateChaincode cechannel ce cecc "OR ('OrgCEMSP.peer')"

echo "end"
