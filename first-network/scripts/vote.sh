CC_SRC_PATH=github.com/chaincode/evote/go
CHANNEL_NAME=itchannel
CCNAME=itcc
Version=1.0

CORE_PEER_LOCALMSPID="OrgITMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/itcae.evote.com/peers/peer0.itcae.evote.com/tls/ca.crt
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/itcae.evote.com/users/Admin@itcae.evote.com/msp
CORE_PEER_ADDRESS=peer0.itcae.evote.com:7051

docker exec cli \
peer chaincode invoke -o orderer.evote.com:7050 \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/evote.com/orderers/orderer.evote.com/msp/tlscacerts/tlsca.evote.com-cert.pem \
-C $CHANNEL_NAME \
-n $CCNAME \
--peerAddresses peer0.itcae.evote.com:7051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/itcae.evote.com/peers/peer0.itcae.evote.com/tls/ca.crt \
-c "{\"Args\":[\"vote\",\"${1}\",\"${2}\",\"${3}\"]}"
