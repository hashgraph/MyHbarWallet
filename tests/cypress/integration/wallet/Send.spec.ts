import { CreateAccountResponse } from "../../support/commands";

describe("Tool: Send Token", () => {
    const { KEY_PRIVATE_KEY, KEY_ACCOUNT_ID } = Cypress.env();
    let tokenId = "";

    beforeEach(() => {
        cy.viewport("macbook-13");

        // Login with Testnet credentials
        cy.visit("/");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cy.login(KEY_PRIVATE_KEY, KEY_ACCOUNT_ID);

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cy.createAccount(KEY_ACCOUNT_ID, KEY_PRIVATE_KEY).then((res) => {
            const response = res as CreateAccountResponse;
            const accountId = response.receipt.accountId?.toString() ?? "";

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.createToken(KEY_ACCOUNT_ID, KEY_PRIVATE_KEY).then((_tokenId: string | undefined) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                cy.associateToken()


                if (_tokenId) tokenId = _tokenId;

                cy.window().its("$store").invoke("requestAccountBalance")

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
