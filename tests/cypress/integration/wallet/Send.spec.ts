import {AssociateTokenRequest, CreateAccountResponse, CreateTokenResponse} from "../../support/commands";

describe("Tool: Send Token", () => {
    const { KEY_PRIVATE_KEY, KEY_ACCOUNT_ID } = Cypress.env();
    const operatorCreds = { operatorKey: KEY_PRIVATE_KEY, operatorAccountId: KEY_ACCOUNT_ID };
    let tokenId = "";

    beforeEach(() => {
        cy.viewport("macbook-13");

        // Login with Testnet credentials
        cy.visit("/");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cy.login(operatorCreds);

        // Navigate from Home to Tool: Associate Token
        cy.get("[data-cy-send]")
            .filter(":visible")
            .click()
            .get("[data-cy-transfer-form]")
            .filter(":visible")
            .click();
    });

    // data-cy-asset-amount
    // data-cy-selector-asset
    // data-cy-asset-selector
    // data-cy-transfer-to

    it("can send a token", async () => {
        // cy.get("[data-cy-tools]")
        //     .filter(":visible")
        //     .click()
        //     .get("[data-cy-tool-associate]")
        //     .filter(":visible")
        //     .click();

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cy.createAccount(operatorCreds).then((resp: CreateAccountResponse) => {
            const accountId = resp.accountId?.toString() ?? "";

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.createToken(operatorCreds).then((resp: CreateTokenResponse) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                tokenId = resp.tokenId.toString();

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                cy.associateToken({
                    operatorKey: operatorCreds.operatorKey,
                    operatorAccountId: operatorCreds.operatorAccountId,
                    accountId: accountId,
                    tokenIds: [tokenId],
                });

            }).then(() => {

                cy.window().its("$store").invoke("requestAccountBalance")
                // Navigate from Home to Tool: Associate Token
                // cy.get("[data-cy-send]")
                //     .filter(":visible")
                //     .click()
                //     .get("[data-cy-transfer-form]")
                //     .filter(":visible")
                //     .click();

                cy.get("[data-cy-transfer-to] input")
                    .click()
                    .type(accountId)
                    .log(accountId)
                    .get("[data-cy-asset-selector]")
                    .click()
                    .get(`[data-cy-selector-asset="${tokenId}"]`)
                    .click()
                    .get("[data-cy-asset-amount]")
                    .type("1")
                    .get("[data-cy-send-button]")
                    .click()
                    .wait(2000)
                    .get("[data-cy-success-message]")
                    .should("exist")
                    .should("contain", "( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°)͡°)")
            })

        });
    });

    // it("can send hbar", async () => {
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // @ts-ignore
    //     cy.createAccount(KEY_ACCOUNT_ID, KEY_PRIVATE_KEY).then((res) => {
    //         const privateKey = res.tempPrivateKey.toString();
    //         const accountId = res.receipt.accountId.toString();
    //
    //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //         // @ts-ignore
    //         cy.createToken(accountId, privateKey).then((_tokenId: string) => {
    //             tokenId = _tokenId;
    //         }).then((tokenId: string) => {
    //
    //             }
    //         ).then(() => {
    //
    //         })
    //     });
    // });


});
