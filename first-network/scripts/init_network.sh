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

export EVOTE_CA0_PRIVATE_KEY=$(cd crypto-config/peerOrganizations/itcae.evote.com/ca && ls *_sk)
export EVOTE_CA1_PRIVATE_KEY=$(cd crypto-config/peerOrganizations/ce.evote.com/ca && ls *_sk)
export EVOTE_CA2_PRIVATE_KEY=$(cd crypto-config/peerOrganizations/kor.evote.com/ca && ls *_sk)
export EVOTE_CA3_PRIVATE_KEY=$(cd crypto-config/peerOrganizations/eng.evote.com/ca && ls *_sk)

docker-compose -f docker-compose-cli.yaml up -d

docker ps -a

docker exec cli scripts/test_it_org.sh
# docker exec cli scripts/install.sh

