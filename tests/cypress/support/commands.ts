/// <reference types="cypress"/>
import {
    TokenCreateTransaction,
    Client,
    AccountId,
    PrivateKey,
    AccountCreateTransaction,
    Hbar,
    TokenDissociateTransaction,
    TokenRevokeKycTransaction,
} from "@hashgraph/sdk";

const { KEY_PRIVATE_KEY, KEY_ACCOUNT_ID } = Cypress.env();

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
    interface Chainable {
        login(): void;
        vue(): void;
        createToken(): void;
    }
}

Cypress.Commands.add("vue", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return cy.wrap(Cypress.vueWrapper);
});

Cypress.Commands.add("login", (privateKey: string, accountId: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.window().its("$store").invoke("login", privateKey, accountId);
    cy.window().its("$router").invoke("push", { name: "home" });
});

Cypress.Commands.add("createAccount", async (accountId, privateKey) => {
    let client;

    try {
        client = Client.forTestnet().setOperator(
            AccountId.fromString(accountId),
            PrivateKey.fromString(privateKey),
        );
    } catch {
        throw new Error(
            "Environment variables HEDERA_NETWORK, OPERATOR_ID, and OPERATOR_KEY are required."
        );
    }

    const newKey = PrivateKey.generate();
    const tempPrivateKey = newKey;
    const tempPublicKey = newKey.publicKey;

    const response = await new AccountCreateTransaction()
        .setInitialBalance(new Hbar(10)) // 10 h
        .setKey(newKey.publicKey)
        .execute(client);

    const receipt = await response.getReceipt(client);

    if(receipt.accountId){
        return ({
            receipt,
            tempPrivateKey,
            tempPublicKey,
        });
    }
})

Cypress.Commands.add("dissociateToken", async (tokenId) => {
    let client: Client | undefined;

    try {
        client = Client.forTestnet().setOperator(
            AccountId.fromString(KEY_ACCOUNT_ID),
            PrivateKey.fromString(KEY_PRIVATE_KEY),
        );
    } catch {
        cy.log("environment variables not set");
    }

    const key = client?.operatorPublicKey;
    const account = client?.operatorAccountId;

    if (client && key && account) {
        let res = await new TokenRevokeKycTransaction()
            .setAccountId(account)
            .setTokenId(tokenId)
            .execute(client);

        await res.getReceipt(client);
    }
})

Cypress.Commands.add("revokeKYC", async (tokenId) => {
    let client: Client | undefined;

    try {
        client = Client.forTestnet().setOperator(
            AccountId.fromString(KEY_ACCOUNT_ID),
            PrivateKey.fromString(KEY_PRIVATE_KEY),
        );
    } catch {
        cy.log("environment variables not set");
    }

    const key = client?.operatorPublicKey;
    const account = client?.operatorAccountId;

    if (client && key && account) {
        let res = await new TokenDissociateTransaction()
            .setAccountId(account)
            .setTokenIds([tokenId])
            .execute(client);

        await res.getReceipt(client);
    }
})

Cypress.Commands.add(
    "createToken",
    async (accountId, privateKey, kyc?: boolean) => {
        let client: Client | undefined;

        try {
            client = Client.forTestnet().setOperator(
                AccountId.fromString(accountId),
                PrivateKey.fromString(privateKey),
            );
        } catch {
            cy.log("environment variables not set");
        }

        const key = client?.operatorPublicKey;
        const account = client?.operatorAccountId;

        if (client && key && account) {
            let tx = new TokenCreateTransaction()
                .setTokenName("ffff")
                .setTokenSymbol("F")
                .setDecimals(3)
                .setInitialSupply(100)
                .setAdminKey(key)
                .setTreasuryAccountId(account)

                if (kyc) tx.setKycKey(key);

                const res = await tx.execute(client);

            const tokenId = (await res.getReceipt(client)).tokenId;
            if(tokenId){
                return tokenId.toString();
            } {
                cy.log("unable to perform token creation")
            }
        }
        {
            cy.log("could not associate client account");
        }
    }
);
