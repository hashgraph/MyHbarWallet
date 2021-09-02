import { CreateAccountResponse, CreateTokenResponse } from "../../support/commands";

describe("Tool: Send Token", () => {
    // get key account information from the cypress env
    const { KEY_PRIVATE_KEY, KEY_ACCOUNT_ID } = Cypress.env();

    //assign those credentials to an object
    const operatorCreds = { operatorKey: KEY_PRIVATE_KEY, operatorAccountId: KEY_ACCOUNT_ID };

    //instantiate token ID
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

    it("can send a token", async () => {

        // Create a temporary account
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cy.createAccount(operatorCreds).then((resp: CreateAccountResponse) => {
            //set accountId to the account Id of created account
            const accountId = resp.accountId?.toString() ?? "";

            // create a token
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.createToken(operatorCreds).then((resp: CreateTokenResponse) => {
                // set tokenID to the value received from createToken
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                tokenId = resp.tokenId.toString();

                // run associate token command with operator credentials
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                cy.associateToken({
                    operatorKey: operatorCreds.operatorKey,
                    operatorAccountId: operatorCreds.operatorAccountId,
                    accountId: accountId,
                    tokenIds: [tokenId],
                });

            }).then(() => {
                // reload account information
                cy.window().its("$store").invoke("requestAccountBalance")

                // send token and verify that we receive a success event.
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

    it("can send hbar", async () => {
        // create a temporary account to send to
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cy.createAccount(operatorCreds).then((resp: CreateAccountResponse) => {
            // set account id to createAccount command response
            const accountId = resp.accountId?.toString() ?? "";

            // attempt hbar send and verify success event
            cy.get("[data-cy-transfer-to] input")
                .click()
                .type(accountId)
                .log(accountId)
                .get("[data-cy-asset-amount]")
                .type("1")
                .get("[data-cy-send-button]")
                .click()
                .wait(2000)
                .get("[data-cy-success-message]")
                .should("exist")
                .should("contain", accountId)
        });
    });
});
