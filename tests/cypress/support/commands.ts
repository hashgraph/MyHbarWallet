/// <reference types="cypress"/>
import {
    TokenCreateTransaction,
    Client,
    AccountId,
    PrivateKey,
    AccountCreateTransaction,
    Hbar,
    TokenDissociateTransaction,
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

Cypress.Commands.add("createAccount", async () => {
    let client;

    try {
        client = Client.forTestnet().setOperator(
            AccountId.fromString(KEY_ACCOUNT_ID),
            PrivateKey.fromString(KEY_PRIVATE_KEY),
        );
    } catch {
        throw new Error(
            "Environment variables HEDERA_NETWORK, OPERATOR_ID, and OPERATOR_KEY are required."
        );
    }

    const newKey = PrivateKey.generate();

    console.log(`private key = ${newKey}`);
    console.log(`public key = ${newKey.publicKey}`);

    const response = await new AccountCreateTransaction()
        .setInitialBalance(new Hbar(10)) // 10 h
        .setKey(newKey.publicKey)
        .execute(client);

    const receipt = await response.getReceipt(client);

    console.log(`account id = ${receipt.accountId}`);

    if(receipt.accountId){
        return (receipt.accountId.toString());
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
        let res = await new TokenDissociateTransaction()
            .setAccountId(account)
            .setTokenIds([tokenId])
            .execute(client);

        await res.getReceipt(client);
    }
})

Cypress.Commands.add(
    "createToken",
    async () => {
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
            let res = await new TokenCreateTransaction()
                .setTokenName("ffff")
                .setTokenSymbol("F")
                .setDecimals(3)
                .setInitialSupply(100)
                .setAdminKey(key)
                .setTreasuryAccountId(account)
                .execute(client);

            const tokenId = (await res.getReceipt(client)).tokenId;
            if(tokenId){
                return tokenId.toString();
            } {
                cy.log("unable to perform toke")
            }
        }
        {
            cy.log("could not associate client account");
        }
    }
);
