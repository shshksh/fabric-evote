/*
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { FileSystemWallet, Gateway } = require("fabric-network");
const path = require("path");

async function send(type, org, channel, chaincode, func, args, res) {
    const ccpPath = path.resolve(__dirname, "..", `connection.json`);
    try {
        const walletPath = path.join(process.cwd(), "..", "wallet");
        const wallet = new FileSystemWallet(walletPath);
        const userExists = await wallet.exists("user1");
        if (!userExists) {
            console.log(
                'An identity for the user "user1" does not exist in the wallet'
            );
            console.log("Run the registerUser.js application before retrying");
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, {
            wallet,
            identity: "user1",
            discovery: { enabled: true, asLocalhost: true },
        });
        const network = await gateway.getNetwork(`${channel}`);
        const contract = network.getContract(`${chaincode}`);

        if (type) {
            await contract.submitTransaction(func, ...args);
            console.log("Transaction has been submitted");
            await gateway.disconnect();
            res.send("Transaction has been submitted");
        } else {
            const result = await contract.evaluateTransaction(func, ...args);
            console.log(
                `Transaction has been evaluated, result is: ${result.toString()}`
            );
            res.send(result.toString());
        }
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.send(`Failed to submit transaction: ${error}`);
    }
}

module.exports = {
    send: send,
};
