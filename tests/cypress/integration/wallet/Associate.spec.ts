import { CreateAccountResponse, CreateTokenResponse } from "../../support/commands";

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cy.createAccount(operatorCreds).then((res) => {
            const response = res as CreateAccountResponse;
            const newAccountId = response.accountId;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.createToken({ 
                operatorAccountId: newAccountId.toString(),
                operatorKey: operatorCreds.operatorKey
            }).then((res: CreateTokenResponse) => {
                cy.get("[data-cy-token-id] input")
                    .filter(":visible")
                    .type(res.tokenId.toString())
                    .get("[data-cy-submit]")
                    .click()
                }
            ).then(() => {
                cy.get("[data-cy-success-modal]")
                    .should("exist")
                    .should("be.visible")
            })
        });
    });

    it("can identify an already associated token", async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cy.createToken(operatorCreds).then((res: CreateTokenResponse) => {
            if (res.tokenId) {
                cy.get("[data-cy-token-id] input")
                    .filter(":visible")
                    .type(res.tokenId.toString())
                    .get("[data-cy-submit]")
                    .click()
                    .get("[data-cy-input-error]")
                    .should("be.visible")
                    .should("contain", "This account and token are already associated.")
            }
        });

    });
});
