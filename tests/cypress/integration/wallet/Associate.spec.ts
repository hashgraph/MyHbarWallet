describe("Tool: Associate Token", () => {
    const { KEY_PRIVATE_KEY, KEY_ACCOUNT_ID } = Cypress.env();
    let tokenId: string = "";

    beforeEach(() => {
        cy.viewport("macbook-13");

        // Login with Testnet credentials
        cy.visit("/");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cy.login(KEY_PRIVATE_KEY, KEY_ACCOUNT_ID);

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
        cy.createAccount(KEY_ACCOUNT_ID, KEY_PRIVATE_KEY).then((res) => {
            const privateKey = res.tempPrivateKey.toString();
            const accountId = res.receipt.accountId.toString();

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.createToken(accountId, privateKey).then((_tokenId: string) => {
                tokenId = _tokenId;
            }).then((tokenId: string) => {
                cy.get("[data-cy-token-id] input")
                    .filter(":visible")
                    .type(tokenId)
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
        cy.createToken(KEY_ACCOUNT_ID, KEY_PRIVATE_KEY).then((tokenId: string) => {
            const tokenIdString = tokenId.toString();
            if (tokenId) {
                cy.get("[data-cy-token-id] input")
                    .filter(":visible")
                    .type(tokenIdString)
                    .get("[data-cy-submit]")
                    .click()
                    .get("[data-cy-input-error]")
                    .should("be.visible")
                    .should("contain", "This account and token are already associated.")
            }
        });

    });
});
