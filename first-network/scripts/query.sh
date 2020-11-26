#!/bin/bash

CC_SRC_PATH=github.com/chaincode/evote/go
TITLE=$1
ORG=$2
CHANNEL_NAME=$3
CCNAME=$4
Version=1.0

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

setEnv $ORG
BASE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/

if [ -z "$5" ]
then
    docker exec \
    -e CORE_PEER_LOCALMSPID=$CORE_PEER_LOCALMSPID \
    -e CORE_PEER_TLS_ROOTCERT_FILE=$BASE${CORE_PEER_TLS_ROOTCERT_FILE#*/crypto-config/} \
    -e CORE_PEER_MSPCONFIGPATH=$BASE${CORE_PEER_MSPCONFIGPATH#*/crypto-config/} \
    -e CORE_PEER_ADDRESS=$CORE_PEER_ADDRESS \
    cli peer chaincode query -C $CHANNEL_NAME -n $CCNAME -c "{\"Args\":[\"query\",\"${TITLE}\"]}"
else
    if [ "$5" == "total" ]
    then
        docker exec \
        -e CORE_PEER_LOCALMSPID=$CORE_PEER_LOCALMSPID \
        -e CORE_PEER_TLS_ROOTCERT_FILE=$BASE${CORE_PEER_TLS_ROOTCERT_FILE#*/crypto-config/} \
        -e CORE_PEER_MSPCONFIGPATH=$BASE${CORE_PEER_MSPCONFIGPATH#*/crypto-config/} \
        -e CORE_PEER_ADDRESS=$CORE_PEER_ADDRESS \
        cli peer chaincode query -C $CHANNEL_NAME -n $CCNAME -c "{\"Args\":[\"query\",\"${TITLE}\",\"total\"]}"
    fi
fi
