CC_SRC_PATH=github.com/chaincode/evote/go
CHANNEL_NAME=itchannel
CCNAME=itcc
Version=1.0

CORE_PEER_LOCALMSPID="OrgITMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/itcae.evote.com/peers/peer0.itcae.evote.com/tls/ca.crt
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/itcae.evote.com/users/Admin@itcae.evote.com/msp
CORE_PEER_ADDRESS=peer0.itcae.evote.com:7051

if [ -z "$2" ]
then
    docker exec cli peer chaincode query -C $CHANNEL_NAME -n $CCNAME -c "{\"Args\":[\"query\",\"${1}\"]}"
else
    if [ "$2" == "total" ]
    then
        docker exec cli peer chaincode query -C $CHANNEL_NAME -n $CCNAME -c "{\"Args\":[\"query\",\"${1}\",\"total\"]}"
    fi
fi
