/*
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const {
    FileSystemWallet,
    Gateway,
    X509WalletMixin,
} = require("fabric-network");
const path = require("path");
const orgs = ["itcae", "ce", "kor", "eng"];
const msps = ["OrgITMSP", "OrgCEMSP", "OrgKORMSP", "OrgENGMSP"];

async function main() {
    for (var i = 0; i < orgs.length; i++) {
        const ccpPath = path.resolve(
            __dirname,
            "..",
            `connection-${orgs[i]}.json`
        );

        try {
            const walletPath = path.join(process.cwd(), "..", "wallet", `${orgs[i]}`);
            const wallet = new FileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);

            const userExists = await wallet.exists("user1");
            if (userExists) {
                console.log(
                    'An identity for the user "user1" already exists in the wallet'
                );
                return;
            }

            const adminExists = await wallet.exists("admin");
            if (!adminExists) {
                console.log(
                    'An identity for the admin user "admin" does not exist in the wallet'
                );
                console.log(
                    "Run the enrollAdmin.js application before retrying"
                );
                return;
            }

            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccpPath, {
                wallet,
                identity: "admin",
                discovery: { enabled: true, asLocalhost: true },
            });

            // Get the CA client object from the gateway for interacting with the CA.
            const ca = gateway.getClient().getCertificateAuthority();
            const adminIdentity = gateway.getCurrentIdentity();

            // Register the user, enroll the user, and import the new identity into the wallet.
            const secret = await ca.register(
                {
                    affiliation: "org1.department1",
                    enrollmentID: "user1",
                    role: "client",
                },
                adminIdentity
            );
            const enrollment = await ca.enroll({
                enrollmentID: "user1",
                enrollmentSecret: secret,
            });
            const userIdentity = X509WalletMixin.createIdentity(
                `${msps[i]}`,
                enrollment.certificate,
                enrollment.key.toBytes()
            );
            await wallet.import("user1", userIdentity);
            console.log(
                'Successfully registered and enrolled admin user "user1" and imported it into the wallet'
            );
        } catch (error) {
            console.error(`Failed to register user "user1": ${error}`);
            process.exit(1);
        }
    }
}

main();
