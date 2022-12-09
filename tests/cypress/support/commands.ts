/// <reference types="cypress"/>
import {
    TokenCreateTransaction,
    Client,
    AccountId,
    PrivateKey,
    AccountCreateTransaction,
    Hbar,
    TokenAssociateTransaction,
    TokenDissociateTransaction,
    TokenGrantKycTransaction,
    TokenRevokeKycTransaction,
    TokenId
} from "@hashgraph/sdk";

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

interface Operator {
    operatorKey: string;
    operatorAccountId: string;
}

Cypress.Commands.add("login", (options: Operator) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.window().its("$store").invoke("login", options.operatorKey, options.operatorAccountId);
    cy.window().its("$router").invoke("push", { name: "home" });
});

export type CreateAccountRequest = Operator & {
    publicKey?: string;
}

export interface CreateAccountResponse {
    accountId: AccountId;
}

Cypress.Commands.add("createAccount", async (options: CreateAccountRequest): Promise<CreateAccountResponse | undefined> => {
    let client;

    try {
        client = Client.forTestnet().setOperator(
            AccountId.fromString(options.operatorAccountId),
            PrivateKey.fromString(options.operatorKey),
        );
    } catch {
        throw new Error(
            "Require options.operatorKey & options.operatorAccountId"
        );
    }

    const publicKey = options.publicKey ?? client.operatorPublicKey;

    if (publicKey) {
        const response = await new AccountCreateTransaction()
            .setInitialBalance(new Hbar(10)) // 10 h
            .setKey(publicKey)
            .execute(client);

        const receipt = await response.getReceipt(client);

        if (receipt.accountId) {
            return ({
                accountId: receipt.accountId
            } as CreateAccountResponse);
        }
    }
})

export type AssociateTokenRequest = Operator & {
    accountId: string;
    tokenIds: string[];
}

Cypress.Commands.add("associateToken", async (options: AssociateTokenRequest): Promise<void | undefined> => {
        const client = Client.forTestnet().setOperator(
            AccountId.fromString(options.operatorAccountId),
            PrivateKey.fromString(options.operatorKey),
        );

    if (client && options.accountId && options.tokenIds) {
        const res = await new TokenAssociateTransaction()
            .setAccountId(options.accountId)
            .setTokenIds(options.tokenIds)
            .execute(client);

        await res.getReceipt(client);
    } else {
        throw new Error(
            "Require options.accountId & options.tokenIds"
        )
    }
})

export type DissociateTokenRequest = AssociateTokenRequest;

Cypress.Commands.add("dissociateToken", async (options: DissociateTokenRequest): Promise<void | undefined> => {
    let client;

    try {
        client = Client.forTestnet().setOperator(
            AccountId.fromString(options.operatorAccountId),
            PrivateKey.fromString(options.operatorKey),
        );
    } catch {
        throw new Error(
            "Require options.operatorKey & options.operatorAccountId"
        );
    }

    if (client && options.accountId && options.tokenIds) {
        const res = await new TokenDissociateTransaction()
            .setAccountId(options.accountId)
            .setTokenIds(options.tokenIds)
            .execute(client);

        await res.getReceipt(client);
    } else {
        throw new Error(
            "Require options.accountId & options.tokenIds"
        )
    }
})

export type GrantKYCRequest = Operator & {
    accountId: string;
    tokenId: string;
}

Cypress.Commands.add("grantKYC", async (options: GrantKYCRequest): Promise<void | undefined> => {
    let client;

    try {
        client = Client.forTestnet().setOperator(
            AccountId.fromString(options.operatorAccountId),
            PrivateKey.fromString(options.operatorKey),
        );
    } catch {
        throw new Error(
            "Require options.operatorKey & options.operatorAccountId"
        );
    }

    if (client && options.accountId && options.tokenId) {
        const res = await new TokenGrantKycTransaction()
            .setAccountId(options.accountId)
            .setTokenId(options.tokenId)
            .execute(client);

        await res.getReceipt(client);
    } else {
        throw new Error(
            "Require options.accountId & options.tokenId"
        )
    }
})

export type RevokeKYCRequest = GrantKYCRequest;

Cypress.Commands.add("revokeKYC", async (options: RevokeKYCRequest): Promise<void | undefined> => {
    let client;

    try {
        client = Client.forTestnet().setOperator(
            AccountId.fromString(options.operatorAccountId),
            PrivateKey.fromString(options.operatorKey),
        );
    } catch {
        throw new Error(
            "Require options.operatorKey & options.operatorAccountId"
        );
    }

    if (client && options.accountId && options.tokenId) {
        const res = await new TokenRevokeKycTransaction()
            .setAccountId(options.accountId)
            .setTokenId(options.tokenId)
            .execute(client);

        await res.getReceipt(client);
    } else {
        throw new Error(
            "Require options.accountId & options.tokenId"
        )
    }
})

export type CreateTokenRequest = Operator & {
    kyc?: boolean;
}

export type CreateTokenResponse = {
    tokenId: TokenId;
}

Cypress.Commands.add("createToken", async (options: CreateTokenRequest): Promise<CreateTokenResponse | undefined> => {
    let client;

    try {
        client = Client.forTestnet().setOperator(
            AccountId.fromString(options.operatorAccountId),
            PrivateKey.fromString(options.operatorKey),
        );
    } catch {
        throw new Error(
            "Require options.operatorKey & options.operatorAccountId"
        );
    }

    const key = client?.operatorPublicKey;
    const account = client?.operatorAccountId;

    if (client && key && account) {
        const tx = new TokenCreateTransaction()
            .setTokenName("Test Token Please Ignore")
            .setTokenSymbol("( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°)͡°)")
            .setDecimals(12)
            .setInitialSupply(1000000000000)
            .setAdminKey(key)
            .setTreasuryAccountId(account)

        if (options.kyc) tx.setKycKey(key);

        const res = await tx.execute(client);

        const tokenId = (await res.getReceipt(client)).tokenId;
        if (tokenId) {
            return { tokenId }
        } {
            throw new Error("Token creation failed");
        }
    }
})
