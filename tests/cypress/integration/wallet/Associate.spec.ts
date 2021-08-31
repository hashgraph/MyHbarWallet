import { CreateAccountResponse, CreateTokenRequest, CreateTokenResponse } from "../../support/commands";

describe("Tool: Associate Token", () => {
    const { KEY_PRIVATE_KEY, KEY_ACCOUNT_ID } = Cypress.env();
    const operatorCreds = { operatorKey: KEY_PRIVATE_KEY, operatorAccountId: KEY_ACCOUNT_ID };

    beforeEach(() => {
        cy.viewport("macbook-13");

        // Login with Testnet credentials
        cy.visit("/");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cy.login(operatorCreds);

        // Navigate from Home to Tool: Associate Token
        cy.get("[data-cy-tools]")
            .filter(":visible")
            .click()
            .get("[data-cy-tool-associate]")
            .filter(":visible")
            .click();
    });

    it("can associate a token", async () => {
        let accountId = "";
        let tokenId = "";

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cy.createAccount(operatorCreds).then((resp: CreateAccountResponse) => {
            accountId = resp.accountId.toString();
        }).then(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.createToken({
                operatorKey: operatorCreds.operatorKey,
                operatorAccountId: accountId
            }).then((resp: CreateTokenResponse) => {
                tokenId = resp.tokenId.toString();

                cy
                    .wait(1000)
                    .get("[data-cy-token-id] input")
                    .filter(":visible")
                    .type(tokenId)
                    .get("[data-cy-submit]")
                    .click()
                    .wait(200)
                    .get("[data-cy-success-modal]")
                    .should("exist")
                    .should("be.visible")
            });
        })
    });

    // it("can identify an already associated token", async () => {
    //     // let tokenId = "";

    //     // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // // @ts-ignore
    //     // cy.createToken(operatorCreds).then((res: CreateTokenResponse) => {
    //     //     if (res.tokenId) {
    //     //         tokenId = res.tokenId.toString();
    //     //     }
    //     // });

    //     // cy.log(tokenId);

    //     // cy.get("[data-cy-token-id] input")
    //     //             .filter(":visible")
    //     //             .type(res.tokenId.toString())
    //     //             .get("[data-cy-submit]")
    //     //             .click()
    //     //             .get("[data-cy-input-error]")
    //     //             .should("be.visible")
    //     //             .should("contain", "This account and token are already associated.")
    // });
});
