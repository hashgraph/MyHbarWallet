describe("Tool: Associate Token", () => {
    const { KEY_PRIVATE_KEY, KEY_ACCOUNT_ID } = Cypress.env();

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

    //TODO: refactor cypress commands to take credentials for client construction instead of 6189
    //TODO: refactor test to create token as one account and associate as another
    it("can associate a token", async () => {
        let tokenId: string = "";
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cy.createToken().then((_tokenId: string) => {
            tokenId = _tokenId;
        }).then(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cy.dissociateToken(tokenId)
            }
        ).then(() => {
            cy.get("[data-cy-token-id] input")
                .filter(":visible")
                .type(tokenId)
                .get("[data-cy-submit]")
                .click()
        })
    });

    // it("can identify an already associated token", async () => {
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // @ts-ignore
    //     cy.createToken().then((tokenId: string) => {
    //         const tokenIdString = tokenId.toString();
    //         if (tokenId) {
    //             cy.get("[data-cy-token-id] input")
    //                 .filter(":visible")
    //                 .type(tokenIdString)
    //                 .get("[data-cy-submit]")
    //                 .click()
    //                 .get("[data-cy-input-error]")
    //                 .should("be.visible")
    //                 .should("contain", "This account and token are already associated.")
    //         }
    //     });
    //
    // });
    //
    // it("can identify a token that requires KYC", () => {});
});
